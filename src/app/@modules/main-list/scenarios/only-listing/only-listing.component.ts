import { Component, OnInit, OnDestroy } from "@angular/core";
import { ListingService } from "@services/listing/listing.service";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingStore } from "@core/stores/listing/listing.store";
import { throttleTime } from "rxjs/operators";
import { Subscription } from "rxjs";
import { noPagesLeft } from "@utils/index";
import { ScenariosStore } from "@core/stores/scenarios/scenarios.store";

@Component({
    selector: "scenario-only-listing",
    templateUrl: "./only-listing.component.html",
    styleUrls: ["./only-listing.component.scss"],
})
export class OnlyListingComponent implements OnInit, OnDestroy {
    private subscribeToGlobalListingOrVendor = new Subscription();

    constructor(
        private listingService: ListingService,
        private vendorService: VendorService,
        private listingStore: ListingStore,
        public scenariosStore: ScenariosStore
    ) {}

    public ngOnInit(): void {
        this.subscribeToGlobalListingOrVendor = this.listingStore.currentListingOrVendor$.pipe(throttleTime(1000)).subscribe(async (listingOrVendorText) => {
            this.scenariosStore.resetNecessaryValues();
            this.scenariosStore.currentListingOrVendor = listingOrVendorText;
            this.scenariosStore.vendorsSubscription = this.createVendorsSubscription(listingOrVendorText);
            this.scenariosStore.listingsSubscription = this.createListingsSubscription(listingOrVendorText);
        });
    }

    ngOnDestroy() {
        this.subscribeToGlobalListingOrVendor.unsubscribe();
    }

    private createVendorsSubscription(listingOrVendorText): Subscription {
        return this.scenariosStore.paginationVendors$.subscribe(async (pagination) => {
            this.scenariosStore.isLoadingVendors = true;
            const { hits, page, nbPages } = await this.vendorService
                .searchVendor({ query: listingOrVendorText, hitsPerPage: pagination.hitsPerPage, page: pagination.page })
                .toPromise();
            const vendors = await this.listingService.fillVendorWithItsListings(hits);
            const vendorsWithListings = vendors.filter((e) => e != null);

            this.scenariosStore.pushToVendors(vendorsWithListings);
            this.scenariosStore.allVendorsLoaded = noPagesLeft(page, nbPages);
            this.scenariosStore.isLoadingVendors = false;
        });
    }

    private createListingsSubscription(listingOrVendorText): Subscription {
        return this.scenariosStore.paginationListings$.subscribe(async (pagination) => {
            this.scenariosStore.isLoadingListings = true;
            const { hits, page, nbPages } = await this.listingService
                .searchListing({ query: listingOrVendorText, hitsPerPage: pagination.hitsPerPage, page: pagination.page })
                .toPromise();
            this.scenariosStore.pushToListings(hits);
            this.scenariosStore.allListingsLoaded = noPagesLeft(page, nbPages);
            this.scenariosStore.isLoadingListings = false;
        });
    }
}
