import { Component, OnInit } from "@angular/core";
import { CartStoreService } from "src/app/@features/stores/cart/cart.store.service";
import { DbServiceService } from "src/app/@features/services/db-service.service";
import { CartItem } from "@models/listingitem.interface";
import ROUTES from "@constants/routing.constants";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
    public globalRoutes = ROUTES;

    public get cartItems(): [] {
        return this.cartStoreService.get("cartItems");
    }

    constructor(private cartStoreService: CartStoreService, private dbService: DbServiceService) {}

    get totalAmount() {
        return Object.values(this.cartItems).reduce((acc, currItem: CartItem) => acc + currItem.item.price * currItem.quantity, 0);
    }

    removeItem(id): void {
        this.cartStoreService.removeCartItem(id);
    }

    changeQuantity(key: string, value: number) {
        this.cartStoreService.changeQuantity(key, value);
    }

    ngOnInit(): void {
        this.cartStoreService.syncListingsFromFireStore();
    }

    ngOnDestroy(): void {}
}
