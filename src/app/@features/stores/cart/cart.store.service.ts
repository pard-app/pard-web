import { Injectable } from "@angular/core";
import { CartItem } from "@models/cart/cartitem.interface";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CartStoreService {
    // private cartItems: Array<CartItem | any> = [];
    private _cartItems$ = new BehaviorSubject<Array<CartItem | any>>([]);
    // Expose the observable$ part of the `_cartItems$` subject (read only stream)
    readonly cartItems$: Observable<Array<CartItem>> = this._cartItems$.asObservable();

    public _lastAddedItem$ = new BehaviorSubject<CartItem>(null);

    constructor() {}

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

    public addItemToCart(item: CartItem) {
        this._lastAddedItem$.next(item);
        this._cartItems$.next([...this._cartItems$.getValue(), item]);
    }

    public resetCart(): void {
        this._cartItems$.next([]);
    }

    public removeCartItem(id: number): void {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
    }
}
