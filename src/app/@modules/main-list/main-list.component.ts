import { Component, OnInit, OnDestroy } from "@angular/core";
import { IVendor } from "src/app/@core/models/vendor.interface";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map, flatMap, skip, take, debounceTime, first, single } from "rxjs/operators";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";
import { ListingItem } from "@models/listingitem.interface";
import { LocationStore } from "@core/stores/location/location.store";
import { geoLocStr } from "@utils/index";
@Component({
    selector: "app-main-list",
    templateUrl: "./main-list.component.html",
    styleUrls: ["./main-list.component.scss"],
})
export class MainListComponent implements OnInit, OnDestroy {
    public vendorsList$ = new Observable<Array<IVendor> | any>();
    public listingsList$ = new Observable<Array<ListingItem> | any>();
    public subscriptions = new Subscription();
    public currentActiveTab$: Observable<Params>;

    constructor(
        public locationStore: LocationStore,
        public vendorService: VendorService,
        private listingService: ListingService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.currentActiveTab$ = this.route.queryParams.pipe(map((params) => params));
        this.searchVendorData({});
        this.searchListingsData({});
    }

    private searchVendorData({ query = "" }) {
        const locationSub = this.locationStore.currentLocation$.subscribe(({ _geoloc }) => {
            if (_geoloc) {
                this.vendorsList$ = this.vendorService.searchVendor({ query, aroundLatLng: geoLocStr(_geoloc) }).pipe(
                    map(({ hits }) => {
                        this.locationStore.currentVendorIdsAtLocation = hits.map(({ objectID }) => objectID);
                        return hits;
                    })
                );
            } else {
                this.locationStore.currentVendorIdsAtLocation = [];
                this.vendorsList$ = this.vendorService.searchVendor({ query }).pipe(map(({ hits }) => hits));
            }
        });
        this.subscriptions.add(locationSub);
    }

    private searchListingsData({ query = "" }) {
        const locationSub = this.locationStore.currentVendorIdsAtLocation$.subscribe((vendorIds) => {
            if (vendorIds && vendorIds.length) {
                this.listingsList$ = this.listingService.searchListingByVendorsIds({ query, vendorIds }).pipe(map(({ hits }) => hits));
            } else {
                this.listingsList$ = this.listingService.searchListing({ query }).pipe(map(({ hits }) => hits));
            }
        });
        this.subscriptions.add(locationSub);
    }

    public changeTab({ tabId }) {
        this.router.navigate([], { queryParams: { view: tabId } });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
