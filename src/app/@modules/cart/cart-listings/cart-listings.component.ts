import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-cart-listings",
    templateUrl: "./cart-listings.component.html",
    styleUrls: ["./cart-listings.component.scss"],
})
export class CartListingsComponent implements OnInit {
    @Input() cartItems;
    constructor() {}

    ngOnInit(): void {}
}
