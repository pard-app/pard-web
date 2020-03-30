import { Component, OnInit } from "@angular/core";
import { CartStoreService } from "src/app/@features/stores/cart/cart.store.service";
import { DbServiceService } from "src/app/@features/services/db-service.service";
import { CartItem } from "@models/listingitem.interface";
import ROUTES from "@constants/routing.constants";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
    public globalRoutes = ROUTES;
    public view: string = ROUTES.CART_LISTINGS_PAGE_ROOT;

    public get cartItems(): [] {
        return this.cartStoreService.get("cartItems");
    }

    constructor(private cartStoreService: CartStoreService, private dbService: DbServiceService, private route: ActivatedRoute) {}

    get totalAmountPrice() {
        return Object.values(this.cartItems).reduce((acc, currItem: CartItem) => acc + currItem.item.price * currItem.quantity, 0);
    }

    removeItem(id): void {
        this.cartStoreService.removeCartItem(id);
    }

    changeQuantity({ key, value }: { key: string; value: number }) {
        this.cartStoreService.changeQuantity(key, value);
    }

    ngOnInit(): void {
        this.route.url.subscribe(x => {
            if (!x.length) return;
            const isCheckout = x[0].path === this.globalRoutes.CART_CHECKOUT_PAGE_ROOT;
            if (isCheckout) this.view = this.globalRoutes.CART_CHECKOUT_PAGE_ROOT;
        });
        this.cartStoreService.syncListingsFromFireStore();
    }

    ngOnDestroy(): void {}
}
