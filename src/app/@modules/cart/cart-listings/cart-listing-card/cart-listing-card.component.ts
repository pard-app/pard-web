import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CartItem } from "src/app/@core/models/listingitem.interface";

interface KeyIndexCartItem {
    key: string;
    value: CartItem;
}
@Component({
    selector: "app-cart-listing-card",
    templateUrl: "./cart-listing-card.component.html",
    styleUrls: ["./cart-listing-card.component.scss"],
})
export class CartListingCardComponent implements OnInit {
    @Input() cartItem: KeyIndexCartItem;
    @Output() removeItem = new EventEmitter();
    @Output() changeQuantity = new EventEmitter<{ key: string; value: number }>();
    public quantity: number;

    constructor() {}

    ngOnInit(): void {
        this.quantity = this.cartItem.value.quantity;
    }
}
