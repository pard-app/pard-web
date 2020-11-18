import { Component, OnInit, OnDestroy } from "@angular/core";
import { LocationStore } from "@core/stores/location/location.store";
import { ListingService } from "@services/listing/listing.service";
import { debounce, filter } from "rxjs/operators";
import { interval, Subscription } from "rxjs";
import { VendorService } from "@services/vendor/vendor.service";
import { geoLocStr, noPagesLeft } from "@utils/index";
import { ScenariosStore } from "@core/stores/scenarios/scenarios.store";
@Component({
    selector: "scenario-only-location",
    templateUrl: "./only-location.component.html",
    styleUrls: ["./only-location.component.scss"],
})
export class OnlyLocationComponent implements OnInit, OnDestroy {
    private subscribeToGlobalLocationChanges = new Subscription();
    private hitsPerPage = 100;

    constructor(
        private locationStore: LocationStore,
        private listingService: ListingService,
        private vendorService: VendorService,
        public scenariosStore: ScenariosStore
    ) {}

    ngOnInit(): void {
        this.subscribeToGlobalLocationChanges = this.locationStore.currentLocation$
            .pipe(
                filter((x) => !!x),
                debounce(() => interval(50))
            )
            .subscribe(async ({ name, _geoloc }) => {
                this.scenariosStore.resetNecessaryValues();
                this.scenariosStore.currentLocation = name;
                this.scenariosStore.vendorsSubscription = this.createVendorsSubscription(_geoloc);
                //this.scenariosStore.listingsSubscription = this.createListingsSubscription(_geoloc);
            });
    }

    ngOnDestroy() {
        this.subscribeToGlobalLocationChanges.unsubscribe();
    }

    private createVendorsSubscription(_geoloc): Subscription {
        return this.scenariosStore.paginationVendors$.subscribe(async (pagination) => {
            this.scenariosStore.isLoadingVendors = true;
            const { hits, page, nbPages } = await this.vendorService
                .searchVendor({ query: "", hitsPerPage: this.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(_geoloc) })
                .toPromise();
            const vendors = await this.listingService.fillVendorWithItsListings(hits);

            const vendorsWithListings = vendors.filter((e) => e != null);

            // vendors.forEach((vendor) => {
            //     console.log(vendor)
            //     if (vendor.listings.length) {
            //     }
            // });
            this.scenariosStore.pushToVendors(vendorsWithListings);

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
