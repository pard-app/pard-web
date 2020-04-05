import { Component, OnInit } from "@angular/core";
import { CartStoreService } from "src/app/@core/stores/cart/cart.store.service";
import { CartItem } from "src/app/@core/models/listingitem.interface";
import { ActivatedRoute } from "@angular/router";
import { IVendor } from "src/app/@core/models/vendor.interface";
import ROUTES from "src/app/@core/constants/routing.constants";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
    public globalRoutes = ROUTES;
    public view: string = ROUTES.CART_LISTINGS_PAGE_ROOT;
    public delivery: boolean;

    constructor(private cartStoreService: CartStoreService, private route: ActivatedRoute) {}

    async ngOnInit() {
        this.route.url.subscribe((x) => {
            if (!x.length) return;
            const isCheckout = x[0].path === this.globalRoutes.CART_CHECKOUT_PAGE_ROOT;
            if (isCheckout) this.view = this.globalRoutes.CART_CHECKOUT_PAGE_ROOT;
        });

        await this.cartStoreService.syncListingsFromAlgolia();
        this.cartStoreService.syncVendorsFromListings();
    }

    public get cartItems(): [] {
        return this.cartStoreService.get("cartItems");
    }

    public get vendorsOfCartItems(): IVendor[] {
        return this.cartStoreService.get("vendorsOfCartItems");
    }

    get totalListingCosts() {
        return Object.values(this.cartItems).reduce((acc, currItem: CartItem) => acc + currItem.item.price * currItem.quantity, 0);
    }

    get totalDeliveryCosts() {
        if (!this.delivery) return 0;
        return this.vendorsOfCartItems.reduce((acc, currItem) => {
            if (currItem.delivery) {
                return acc + currItem.delivery_costs;
            } else {
                return acc;
            }
        }, 0);
    }

    get totalPriceWithDelivery() {
        return this.totalListingCosts + this.totalDeliveryCosts;
    }

    removeItem(id): void {
        this.cartStoreService.removeCartItem(id);
    }

    changeQuantity({ key, value }: { key: string; value: number }) {
        this.cartStoreService.changeQuantity(key, value);
    }

    toggleDelivery(delivery: boolean) {
        this.delivery = delivery;
    }

    ngOnDestroy(): void {}
}
