import { Component, OnInit } from "@angular/core";
import { CartStoreService } from "src/app/@features/stores/cart/cart.store.service";
import { DbServiceService } from "src/app/@features/services/db-service.service";
import { Subscription } from "rxjs";
import { ListingItem } from "@models/listingitem.interface";

interface CartItemsIterator {
    [state: string]: ListingItem;
}
@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
    private cartItemsSubscribtion: Subscription = new Subscription();
    public cartItems: CartItemsIterator = {};

    constructor(private cartStoreService: CartStoreService, private dbService: DbServiceService) {}
    get totalAmount() {
        return Object.values(this.cartItems).reduce((acc, item) => acc + item.price, 0);
    }
    ngOnInit(): void {
        const cartItems = this.cartStoreService.get("cartItems");
        if (!cartItems.length) return;

        cartItems.map(({ id }) => {
            this.cartItemsSubscribtion.add(
                this.dbService.getListingById(id).subscribe(x => {
                    this.cartItems[id] = x;
                })
            );
        });
    }

    ngOnDestroy(): void {
        this.cartItemsSubscribtion.unsubscribe();
    }
}
