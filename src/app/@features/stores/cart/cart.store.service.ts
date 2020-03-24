import { Injectable } from "@angular/core";
import { CartItem } from "@models/cart/cartitem.interface";

@Injectable({
    providedIn: "root"
})
export class CartStoreService {
    private cartItems: Array<CartItem | any> = [];

    constructor() {}

    public get get() {
        return function(itemName) {
            return this[itemName];
        };
    }
    public addItemToCart(item) {
        this.cartItems = [...this.cartItems, item];
    }
}
