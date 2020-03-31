import { Component, OnInit } from "@angular/core";
import { DbServiceService } from "@services/db-service/db-service.service";
import { ActivatedRoute } from "@angular/router";
import { ListingItem } from "@models/listingitem.interface";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { IVendor } from "@models/vendor.interface";
import { CartStoreService } from "src/app/@features/stores/cart/cart.store.service";
import { convertObservableToBehaviorSubject } from "src/app/@features/utils";

@Component({
    selector: "app-vendor-single-listing-view",
    templateUrl: "./vendor-single-listing-view.component.html",
    styleUrls: ["./vendor-single-listing-view.component.scss"]
})
export class VendorSingleListingViewComponent implements OnInit {
    constructor(private dbService: DbServiceService, private route: ActivatedRoute, private cartStoreService: CartStoreService) {}
    public listing$: BehaviorSubject<ListingItem>;
    public vendor$: Observable<IVendor>;

    addToCart() {
        this.cartStoreService.addItemToCart(this.listing$.getValue());
    }

    ngOnInit(): void {
        this.route.params.subscribe(({ listingId, vendorId }) => {
            // this.listing$ = convertObservableToBehaviorSubject(this.dbService.getListingById(listingId), null);
            this.vendor$ = this.dbService.getVendorById(vendorId);
        });
    }
}
