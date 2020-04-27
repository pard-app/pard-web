import { Component, OnInit, Input } from "@angular/core";
import { CartStoreService } from "@core/stores/cart/cart.store.service";
import { ListingItem } from "@core/models/listingitem.interface";
import { ROUTING_CONSTANTS } from "@core/constants/routing.constants";

@Component({
    selector: "app-card-listing",
    templateUrl: "./card-listing.component.html",
    styleUrls: ["./card-listing.component.scss"],
})
export class CardListingComponent implements OnInit {
    @Input() item: ListingItem;
    public globalRoutes = ROUTING_CONSTANTS;

    constructor(private cartStoreService: CartStoreService) {}

    ngOnInit(): void {}

    addToCart() {
        this.cartStoreService.addItemToCart(this.item);
    }
}
