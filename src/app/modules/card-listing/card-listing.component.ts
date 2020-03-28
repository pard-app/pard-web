import { Component, OnInit, Input } from "@angular/core";
import { CartStoreService } from "src/app/@features/stores/cart/cart.store.service";
import { ListingItem } from "@models/listingitem.interface";

@Component({
    selector: "app-card-listing",
    templateUrl: "./card-listing.component.html",
    styleUrls: ["./card-listing.component.scss"]
})
export class CardListingComponent implements OnInit {
    @Input() item: ListingItem;

    constructor(private cartStoreService: CartStoreService) {}

    ngOnInit(): void {}

    addToCart() {
        this.cartStoreService.addItemToCart(this.item);
    }
}
