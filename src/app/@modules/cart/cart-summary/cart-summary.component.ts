import { Component, OnInit, Input } from "@angular/core";
import { CartItem, CartItemObject } from "src/app/@core/models/listingitem.interface";
import ROUTES from "src/app/@core/constants/routing.constants";

@Component({
    selector: "app-cart-summary",
    templateUrl: "./cart-summary.component.html",
    styleUrls: ["./cart-summary.component.scss"],
})
export class CartSummaryComponent {
    @Input() cartItems: CartItemObject;
    @Input() view: string;
    @Input() totalAmount: string | number;
    @Input() vendors: any;
    @Input() delivery: boolean;

    public globalRoutes = ROUTES;
    get cartItemsLength() {
        return Object.keys(this.cartItems).length;
    }
    constructor() {}
}
