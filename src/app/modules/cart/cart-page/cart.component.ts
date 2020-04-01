import { Component, OnInit } from "@angular/core";
import { CartStoreService } from "src/app/@features/stores/cart/cart.store.service";
import { CartItem } from "@models/listingitem.interface";
import ROUTES from "@constants/routing.constants";
import { ActivatedRoute } from "@angular/router";
import { VendorService } from "@services/vendor/vendor.service";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
    public globalRoutes = ROUTES;
    public view: string = ROUTES.CART_LISTINGS_PAGE_ROOT;
    public vendors: any;
    public delivery: boolean;

    public get cartItems(): [] {
        return this.cartStoreService.get("cartItems");
    }

    constructor(private cartStoreService: CartStoreService, private route: ActivatedRoute, private vendorService: VendorService) {}

    get totalListingCosts() {
        return Object.values(this.cartItems).reduce((acc, currItem: CartItem) => acc + currItem.item.price * currItem.quantity, 0);
    }

    get totalDeliveryCosts() {
        if (this.vendors) {
            return this.vendors.reduce((acc, currItem) => {
                if (currItem.delivery) {
                    return acc + currItem.delivery_costs;
                } else {
                    return acc;
                }
            }, 0);
        } else {
            return 0;
        }
    }

    get totalPrice() {
        return this.totalListingCosts + this.totalDeliveryCosts;
    }

    removeItem(id): void {
        this.cartStoreService.removeCartItem(id);
    }

    changeQuantity({ key, value }: { key: string; value: number }) {
        this.cartStoreService.changeQuantity(key, value);
    }

    public async getVendorData() {
        const cartItemsArray: Array<CartItem> = Object.values(this.cartStoreService.get("cartItems"));
        let uniqueVendors = [];

        cartItemsArray.map(item => {
            if (!uniqueVendors.includes(item.item.vendor)) {
                uniqueVendors.push(item.item.vendor);
            }
        });

        this.vendors = (await this.vendorService.getMultipleVendors(uniqueVendors)).results;
    }

    toggleDelivery(delivery: boolean) {
        this.delivery = delivery;
        console.log("delivery", this.delivery);
    }

    ngOnInit() {
        this.route.url.subscribe(x => {
            if (!x.length) return;
            const isCheckout = x[0].path === this.globalRoutes.CART_CHECKOUT_PAGE_ROOT;
            if (isCheckout) this.view = this.globalRoutes.CART_CHECKOUT_PAGE_ROOT;
        });

        //this.vendors = this.route.snapshot.data.vendors;

        this.cartStoreService.syncListingsFromAlgolia().then(() => {
            this.getVendorData();
        });
    }

    ngOnDestroy(): void {}
}
