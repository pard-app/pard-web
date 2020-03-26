import { Injectable, OnInit } from "@angular/core";
import { ListingItem } from "@models/listingitem.interface";
import { BehaviorSubject, Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { CART_CONSTANTS } from "@constants/cart.constants";
import { DbServiceService } from "@services/db-service.service";

@Injectable({
    providedIn: "root"
})
export class CartStoreService {
    // private cartItems: Array<ListingItem | any> = [];
    private _cartItems$ = new BehaviorSubject<{} | any>({});
    // Expose the observable$ part of the `_cartItems$` subject (read only stream)
    readonly cartItems$: Observable<{}> = this._cartItems$.asObservable();

    public _lastAddedItem$ = new BehaviorSubject<ListingItem>(null);

    constructor(private cookieService: CookieService, private dbService: DbServiceService) {}

    public populateListingsFromCookieToState() {
        const value = this.cookieService.get(CART_CONSTANTS.CART_ITEMS_IN_COOKIE);
        if (!value) return;
        this.cartItems = JSON.parse(value);
    }

    private syncListingsToCookies() {
        this.cookieService.set(CART_CONSTANTS.CART_ITEMS_IN_COOKIE, JSON.stringify(this.cartItems));
    }

    // renew data
    public syncListingsFromFireStore() {
        Object.keys(this.cartItems).map(id => {
            this.dbService
                .getListingById(id)
                .toPromise()
                .then(x => {
                    const item = x.data();
                    if (item) {
                        this.cartItems[x.id] = item;
                    } else {
                        this.removeCartItem(id);
                    }
                });
        });
    }

    // lastest emitted value
    private get cartItems() {
        return this._cartItems$.getValue();
    }

    private set cartItems(val) {
        this._cartItems$.next(val);
    }

    public get get() {
        return itemName => this[itemName];
    }

    // Methods
    public addItemToCart(item: ListingItem) {
        this._lastAddedItem$.next(item);
        this._cartItems$.next({ ...this._cartItems$.getValue(), [item.id]: item });
        this.syncListingsToCookies();
    }

    public resetCart(): void {
        this._cartItems$.next({});
    }

    public removeCartItem(id: string): void {
        console.log(id);
        var mockObject = this.cartItems;
        delete mockObject[id];
        this.cartItems = mockObject;
        this.syncListingsToCookies();
    }
}
