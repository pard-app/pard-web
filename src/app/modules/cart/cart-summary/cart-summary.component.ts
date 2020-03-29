import { Component, OnInit, Input } from "@angular/core";
import { CartItem } from "@models/listingitem.interface";
import ROUTES from "@constants/routing.constants";

@Component({
    selector: "app-cart-summary",
    templateUrl: "./cart-summary.component.html",
    styleUrls: ["./cart-summary.component.scss"]
})
export class CartSummaryComponent {
    @Input() cartItems: Array<CartItem>;
    @Input() view: string;
    @Input() totalAmount: string | number;
    public globalRoutes = ROUTES;
    constructor() {}
}
