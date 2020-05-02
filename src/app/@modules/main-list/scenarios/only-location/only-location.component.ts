import { Component, OnInit, OnDestroy } from "@angular/core";
import { LocationStore } from "@core/stores/location/location.store";
import { ListingService } from "@services/listing/listing.service";
import { debounce, filter } from "rxjs/operators";
import { interval, Subscription, Observable, BehaviorSubject } from "rxjs";
import { IVendor } from "@models/vendor.interface";
import { ListingItem } from "@models/listingitem.interface";
import { VendorService } from "@services/vendor/vendor.service";
import { geoLocStr, noPagesLeft } from "@utils/index";
import { ScenariosStore } from "@core/stores/scenarios/scenarios.store";

const paginationDefaultValue = (pp = 6) => ({
    page: 0,
    hitsPerPage: pp,
});
@Component({
    selector: "scenario-only-location",
    templateUrl: "./only-location.component.html",
    styleUrls: ["./only-location.component.scss"],
})
export class OnlyLocationComponent implements OnInit {
    constructor(
        private locationStore: LocationStore,
        private listingService: ListingService,
        private vendorService: VendorService,
        public scenariosStore: ScenariosStore
    ) {}

    ngOnInit(): void {
        const subscribeToGlobalLocationChanges = this.locationStore.currentLocation$
            .pipe(
                filter((x) => !!x),
                debounce(() => interval(50))
            )
            .subscribe(async ({ name, _geoloc }) => {
                this.scenariosStore.resetNecessaryValues();
                this.scenariosStore.currentLocation = name;
                this.scenariosStore.vendorsSubscription = this.createVendorsSubscription(_geoloc);
                this.scenariosStore.listingsSubscription = this.createListingsSubscription(_geoloc);
            });

        this.scenariosStore.subscriptions.add(subscribeToGlobalLocationChanges);
    }

    private createVendorsSubscription(_geoloc): Subscription {
        return this.scenariosStore.paginationVendors$.subscribe(async (pagination) => {
            this.scenariosStore.isLoadingVendors = true;
            const { hits, page, nbPages } = await this.vendorService
                .searchVendor({ query: "", hitsPerPage: pagination.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(_geoloc) })
                .toPromise();
            const vendors = await this.listingService.fillVendorWithItsListings(hits);
            this.scenariosStore.pushToVendors(vendors);
            this.scenariosStore.allVendorsLoaded = noPagesLeft(page, nbPages);
            this.scenariosStore.isLoadingVendors = false;
        });
    }

    private createListingsSubscription(_geoloc): Subscription {
        return this.scenariosStore.paginationListings$.subscribe(async (pagination) => {
            this.scenariosStore.isLoadingListings = true;
            const { hits, page, nbPages } = await this.listingService
                .searchListing({ query: "", hitsPerPage: pagination.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(_geoloc) })
                .toPromise();
            this.scenariosStore.pushToListings(hits);
            this.scenariosStore.allListingsLoaded = noPagesLeft(page, nbPages);
            this.scenariosStore.isLoadingListings = false;
        });
    }
}
