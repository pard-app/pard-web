import { Injectable, OnInit } from "@angular/core";
import { ListingItem, CartItem, CartItemObject } from "@models/listingitem.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { CART_CONSTANTS } from "@constants/cart.constants";
import { DbServiceService } from "@services/db-service.service";

@Injectable({
    providedIn: "root"
})
export class CartStoreService {
    // private cartItems: Array<ListingItem | any> = [];
    private _cartItems$ = new BehaviorSubject<CartItemObject>({});
    // Expose the observable$ part of the `_cartItems$` subject (read only stream)
    private readonly cartItems$: Observable<CartItemObject> = this._cartItems$.asObservable();
    private readonly cartItemLimit: number = 5;
    public _lastAddedItem$ = new BehaviorSubject<ListingItem>(null);

    constructor(private cookieService: CookieService, private dbService: DbServiceService) {}

    public get cartItemsLength(): number {
        return Object.keys(this.cartItems).length;
    }

    private get isCartFull(): boolean {
        return this.cartItemsLength >= this.cartItemLimit;
    }

    // lastest emitted value
    private get cartItems() {
        return this._cartItems$.getValue();
    }

    private set cartItems(val: { [id: string]: CartItem }) {
        this._cartItems$.next(val);
    }

    public get get() {
        return itemName => this[itemName];
    }

    private syncListingsToCookies() {
        this.cookieService.set(CART_CONSTANTS.CART_ITEMS_IN_COOKIE, JSON.stringify(this.cartItems), 3);
    }

    public populateListingsFromCookieToState() {
        const value = this.cookieService.get(CART_CONSTANTS.CART_ITEMS_IN_COOKIE);
        if (!value) return;
        this.cartItems = JSON.parse(value);
    }
    // renew data
    public syncListingsFromFireStore() {
        Object.keys(this.cartItems).map(id => {
            this.dbService
                .getListingById(id)
                .toPromise()
                .then(x => {
                    if (x.data) {
                        this.cartItems[x.id]["item"] = x.data;
                    } else {
                        this.removeCartItem(id);
                    }
                });
        });
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
            [item.objectID]: { item, quantity: findCartItemInCart ? findCartItemInCart.quantity + 1 : 1 }
        });
        this.syncListingsToCookies();
    }

    public changeQuantity(key, val) {
        this.cartItems[key].quantity = val;
        this.syncListingsToCookies();
    }

    public resetCart(): void {
        this._cartItems$.next({});
    }

    public removeCartItem(id: string): void {
        var mockObject = this.cartItems;
        delete mockObject[id];
        this.cartItems = mockObject;
        this.syncListingsToCookies();
    }
}
