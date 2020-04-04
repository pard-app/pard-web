import { Component, OnInit, OnDestroy } from "@angular/core";
import { IVendor } from "src/app/@core/models/vendor.interface";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map, flatMap } from "rxjs/operators";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";
import { ListingItem } from "@models/listingitem.interface";
import { LocationService } from "@core/stores/location/location.service";
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
        public locationService: LocationService,
        public vendorService: VendorService,
        private listingService: ListingService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.currentActiveTab$ = this.route.queryParams.pipe(map((params) => params));
        this.searchVendorData({});
        this.searchListingsData({});
        this.fetchByLocation();
    }

    private searchVendorData({ query = "" }) {
        this.vendorsList$ = this.vendorService.searchVendor({ query }).pipe(map(({ hits }) => hits));
    }

    private searchListingsData({ query = "" }) {
        this.listingsList$ = this.listingService.searchListing({ query }).pipe(map(({ hits }) => hits));
    }

    private fetchByLocation() {
        const locationSub = this.locationService.curretLocation$.subscribe(({ _geoloc }) => {
            console.log(_geoloc);
            if (!_geoloc) return;
            this.vendorsList$ = this.vendorService.searchVendor({ query: "", aroundLatLng: geoLocStr(_geoloc) }).pipe(map(({ hits }) => hits));
            // this.listingsList$ = this.listingService.searchListing({ query: "", }).pipe(map(({ hits }) => hits));
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
