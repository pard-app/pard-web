import { Component, OnInit, OnDestroy } from "@angular/core";
import { ListingService } from "@services/listing/listing.service";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingStore } from "@core/stores/listing/listing.store";
import { debounce } from "rxjs/operators";
import { interval, Subscriber, Subscription } from "rxjs";

@Component({
    selector: "scenario-only-listing",
    templateUrl: "./only-listing.component.html",
    styleUrls: ["./only-listing.component.scss"],
})
export class OnlyListingComponent implements OnInit, OnDestroy {
    private currentListingOrVendor: string;
    // sub
    private subscriptions = new Subscription();

    constructor(private listingService: ListingService, private vendorService: VendorService, private listingStore: ListingStore) {}

    ngOnInit(): void {
        const subscribeToGlobalListingOrVendor = this.listingStore.currentListingOrVendor$.pipe(debounce(() => interval(50))).subscribe(async (data) => {
            console.log(data);
            // this.currentListingOrVendor = name;
            this.resetNecessaryValues();
            // this.vendorsSubscription = this.createVendorsSubscription(hit._geoloc);
            // this.listingsSubscription = this.createListingsSubscription(hit._geoloc);
        });

        this.subscriptions.add(subscribeToGlobalListingOrVendor);
    }

    private resetNecessaryValues(): void {}

    ngOnDestroy(): void {
        console.log("destroy");
    }
}
