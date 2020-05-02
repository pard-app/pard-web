import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, combineLatest } from "rxjs";
import { ListingService } from "@services/listing/listing.service";
import { VendorService } from "@services/vendor/vendor.service";
import { filter } from "rxjs/operators";
import { ListingStore } from "@core/stores/listing/listing.store";
import { noPagesLeft, geoLocStr } from "@utils/index";
import { LocationStore } from "@core/stores/location/location.store";
import { ILocation } from "@models/location.interface";
import { ScenariosStore } from "@core/stores/scenarios/scenarios.store";

@Component({
    selector: "scenario-location-and-listing",
    templateUrl: "./location-and-listing.component.html",
    styleUrls: ["./location-and-listing.component.scss"],
})
export class LocationAndListingComponent implements OnInit {
    constructor(
        private listingService: ListingService,
        private vendorService: VendorService,
        private listingStore: ListingStore,
        private locationStore: LocationStore,
        public scenariosStore: ScenariosStore
    ) {}

    ngOnInit(): void {
        const subscribeToGlobalListingOrVendor = combineLatest([this.locationStore.currentLocation$, this.listingStore.currentListingOrVendor$])
            .pipe(filter((combinedItems: [ILocation, string]) => !combinedItems.some((val) => !val)))
            .subscribe(async ([location, listingOrVendorText]) => {
                this.scenariosStore.resetNecessaryValues();
                this.scenariosStore.currentListingOrVendor = listingOrVendorText;
                this.scenariosStore.currentLocation = location.name;
                this.scenariosStore.vendorsSubscription = this.createVendorsSubscription(listingOrVendorText, location._geoloc);
                this.scenariosStore.listingsSubscription = this.createListingsSubscription(listingOrVendorText, location._geoloc);
            });

        this.scenariosStore.subscriptions.add(subscribeToGlobalListingOrVendor);
    }

    private createVendorsSubscription(listingOrVendorText, geoloc): Subscription {
        return this.scenariosStore.paginationVendors$.subscribe(async (pagination) => {
            const { hits, page, nbPages } = await this.vendorService
                .searchVendor({ query: listingOrVendorText, hitsPerPage: pagination.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(geoloc) })
                .toPromise();
            const vendors = await this.listingService.fillVendorWithItsListings(hits);
            this.scenariosStore.pushToVendors(vendors);
            this.scenariosStore.allVendorsLoaded = noPagesLeft(page, nbPages);
        });
    }

    private createListingsSubscription(listingOrVendorText, geoloc): Subscription {
        return this.scenariosStore.paginationListings$.subscribe(async (pagination) => {
            const { hits, page, nbPages } = await this.listingService
                .searchListing({ query: listingOrVendorText, hitsPerPage: pagination.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(geoloc) })
                .toPromise();
            this.scenariosStore.pushToListings(hits);
            this.scenariosStore.allListingsLoaded = noPagesLeft(page, nbPages);
        });
    }
}
