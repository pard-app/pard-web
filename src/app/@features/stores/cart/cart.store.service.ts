import { Injectable } from "@angular/core";
import { CartItem } from "@models/cart/cartitem.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CartStoreService {
    // private cartItems: Array<CartItem | any> = [];
    private _cartItems$: BehaviorSubject<Array<CartItem | any>> = new BehaviorSubject([]);

    constructor() {}

    public get cartItems() {
        return this._cartItems$.value;
    }

    public get get() {
        return itemName => this[itemName];
    }

    public addItemToCart(item) {
        this._cartItems$.next([...this._cartItems$.getValue(), item]);
    }
}
