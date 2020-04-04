import { Injectable, OnInit } from "@angular/core";
import { ListingItem, CartItem, CartItemObject } from "src/app/@core/models/listingitem.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { CART_CONSTANTS } from "src/app/@core/constants/cart.constants";
import { ListingService } from "@services/listing/listing.service";
import { IVendor } from "src/app/@core/models/vendor.interface";
import { VendorService } from "@services/vendor/vendor.service";

@Injectable({
    providedIn: "root",
})
export class CartStoreService {
    // private cartItems: Array<ListingItem | any> = [];
    private _cartItems$ = new BehaviorSubject<CartItemObject>({});
    // Expose the observable$ part of the `_cartItems$` subject (read only stream)
    private readonly cartItems$: Observable<CartItemObject> = this._cartItems$.asObservable();
    private readonly cartItemLimit: number = 99;
    public _lastAddedItem$ = new BehaviorSubject<ListingItem>(null);

    // Vendors
    private readonly _vendorsOfCartItems$ = new BehaviorSubject<Array<IVendor> | any>([]);

    constructor(private listingService: ListingService, private vendorService: VendorService) {}

    public get cartItemsLength(): number {
        return Object.keys(this.cartItems).length;
    }

    public get isCartFull(): boolean {
        return this.cartItemsLength >= this.cartItemLimit;
    }

    // lastest emitted value
    private get cartItems() {
        return this._cartItems$.getValue();
    }

    private get vendorsOfCartItems() {
        return this._vendorsOfCartItems$.getValue();
    }

    private set cartItems(val: { [id: string]: CartItem }) {
        this._cartItems$.next(val);
    }

    public get get() {
        return (itemName) => this[itemName];
    }
    // TO LOCAL STORAGE
    private syncListingsToLocalStorage() {
        localStorage.setItem(CART_CONSTANTS.CART_ITEMS_IN_COOKIE, JSON.stringify(this.cartItems));
    }
    // FROM LOCAL STORAGE
    public syncLocalStorageToListings() {
        const value = localStorage.getItem(CART_CONSTANTS.CART_ITEMS_IN_COOKIE);
        if (!value) return;
        this.cartItems = JSON.parse(value);
    }
    // renew data
    public async syncListingsFromAlgolia() {
        const { results } = await this.listingService.getListingsByIds(Object.keys(this.cartItems));
        results.map((item: ListingItem) => {
            this.cartItems[item.objectID]["item"] = item;
        });
    }

    public async syncVendorsFromListings() {
        const cartItemsArray: Array<CartItem> = Object.values(this.get("cartItems"));
        let uniqueVendors = [];
        cartItemsArray.map(({ item }) => !uniqueVendors.includes(item.vendor) && uniqueVendors.push(item.vendor));

        const { results } = await this.vendorService.getMultipleVendors(uniqueVendors);
        this._vendorsOfCartItems$.next(results);
    }

    // Methods
    public addItemToCart(item: ListingItem) {
        // don't add to cart if exceeds limit
        if (this.isCartFull) return;

        this._lastAddedItem$.next(item);
        const currentCartItems = this._cartItems$.getValue();
        const findCartItemInCart: CartItem = currentCartItems[item.objectID];
        this._cartItems$.next({
            ...currentCartItems,
            [item.objectID]: { item, quantity: findCartItemInCart ? findCartItemInCart.quantity + 1 : 1 },
        });
        this.syncListingsToLocalStorage();
    }

    public changeQuantity(key, val) {
        this.cartItems[key].quantity = val;
        this.syncListingsToLocalStorage();
    }

    public resetCart(): void {
        this._cartItems$.next({});
    }

    public removeCartItem(id: string): void {
        var mockObject = this.cartItems;
        delete mockObject[id];
        this.cartItems = mockObject;
        this.syncListingsToLocalStorage();
        this.syncVendorsFromListings();
    }
}
