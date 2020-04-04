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

    public quantityArr: Array<Number> = Array.from(Array(10).keys());

    constructor() {}

    // removeItem(id): void {
    //     // this.removeItem.emit(id);
    // }

    // changeQuantity(key: string, value: number) {
    //     // this.changeQuantity.emit(key, value);
    // }

    ngOnInit(): void {}
}
