import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { CartStoreService } from "@core/stores/cart/cart.store.service";
import { ListingService } from "@services/listing/listing.service";
import { VendorService } from "@services/vendor/vendor.service";

@Component({
    selector: "app-vendor-single-listing-view",
    templateUrl: "./vendor-single-listing-view.component.html",
    styleUrls: ["./vendor-single-listing-view.component.scss"],
})
export class VendorSingleListingViewComponent implements OnInit {
    constructor(
        private listingService: ListingService,
        private vendorService: VendorService,
        private route: ActivatedRoute,
        private cartStoreService: CartStoreService
    ) {}
    public _listing$ = new BehaviorSubject({} as any);
    public _vendor$ = new BehaviorSubject({} as any);

    addToCart() {
        this.cartStoreService.addItemToCart(this._listing$.getValue());
    }

    ngOnInit() {
        this.route.params.subscribe(async ({ listingId, vendorId }) => {
            const listingData = await this.listingService.getListingById(listingId);
            this._listing$.next(listingData);
            const vendorData = await this.vendorService.getVendorById(vendorId);
            this._vendor$.next(vendorData);
        });
    }
}
