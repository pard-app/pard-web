import { Component, OnInit, OnDestroy } from "@angular/core";
import { LocationStore } from "@core/stores/location/location.store";
import { ListingService } from "@services/listing/listing.service";
import { debounce, filter } from "rxjs/operators";
import { interval, Subscription, Observable, BehaviorSubject } from "rxjs";
import { IVendor } from "@models/vendor.interface";
import { ListingItem } from "@models/listingitem.interface";
import { VendorService } from "@services/vendor/vendor.service";
import { geoLocStr, noPagesLeft } from "@utils/index";

const paginationDefaultValue = (pp = 6) => ({
    page: 0,
    hitsPerPage: pp,
});
@Component({
    selector: "scenario-only-location",
    templateUrl: "./only-location.component.html",
    styleUrls: ["./only-location.component.scss"],
})
export class OnlyLocationComponent implements OnInit, OnDestroy {
    // subjects (set only)
    private _listings$: BehaviorSubject<ListingItem[]> = new BehaviorSubject([]);
    private _vendors$: BehaviorSubject<IVendor[]> = new BehaviorSubject([]);
    // observables
    public readonly listings$: Observable<ListingItem[]> = this._listings$.asObservable();
    public readonly vendors$: Observable<IVendor[]> = this._vendors$.asObservable();
    // pagination handlers
    private _paginationVendors$ = new BehaviorSubject(paginationDefaultValue());
    private _paginationListings$ = new BehaviorSubject(paginationDefaultValue(12));
    // subscriptions
    private subscriptions = new Subscription();
    private vendorsSubscription = new Subscription();
    private listingsSubscription = new Subscription();
    // location
    public currentLocationName: string;
    // pagination
    public allListingsLoaded: boolean;
    public isLoadingListings: boolean;
    public allVendorsLoaded: boolean;
    public isLoadingVendors: boolean;

    constructor(private locationStore: LocationStore, private listingService: ListingService, private vendorService: VendorService) {}

    ngOnInit(): void {
        const subscribeToGlobalLocationChanges = this.locationStore.currentLocation$
            .pipe(
                filter((x) => !!x),
                debounce(() => interval(50))
            )
            .subscribe(async ({ name, _geoloc }) => {
                this.currentLocationName = name;
                this.resetNecessaryValues();
                this.vendorsSubscription = this.createVendorsSubscription(_geoloc);
                this.listingsSubscription = this.createListingsSubscription(_geoloc);
            });

        this.subscriptions.add(subscribeToGlobalLocationChanges);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.vendorsSubscription.unsubscribe();
        this.listingsSubscription.unsubscribe();
    }

    private createVendorsSubscription(_geoloc): Subscription {
        return this._paginationVendors$.subscribe(async (pagination) => {
            this.isLoadingVendors = true;
            const { hits, page, nbPages } = await this.vendorService
                .searchVendor({ query: "", hitsPerPage: pagination.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(_geoloc) })
                .toPromise();
            const vendors = await this.listingService.fillVendorWithItsListings(hits);
            this._vendors$.next([...this._vendors$.getValue(), ...vendors]);
            this.allVendorsLoaded = noPagesLeft(page, nbPages);
            this.isLoadingVendors = false;
        });
    }

    private createListingsSubscription(_geoloc): Subscription {
        return this._paginationListings$.subscribe(async (pagination) => {
            this.isLoadingListings = true;
            const { hits, page, nbPages } = await this.listingService
                .searchListing({ query: "", hitsPerPage: pagination.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(_geoloc) })
                .toPromise();
            this._listings$.next([...this._listings$.getValue(), ...hits]);
            this.allListingsLoaded = noPagesLeft(page, nbPages);
            this.isLoadingListings = false;
        });
    }

    public loadMore(which: string): void {
        const previousVal = which == "LOAD_VENDORS" ? this._paginationVendors$.getValue() : this._paginationListings$.getValue();
        switch (which) {
            case "LOAD_VENDORS":
                this._paginationVendors$.next({
                    ...previousVal,
                    page: previousVal.page + 1,
                });
                break;
            case "LOAD_LISTINGS":
                this._paginationListings$.next({
                    ...previousVal,
                    page: previousVal.page + 1,
                });
                break;
            default:
                break;
        }
    }

    private resetNecessaryValues(): void {
        this.listingsSubscription.unsubscribe();
        this.vendorsSubscription.unsubscribe();
        this._listings$.next([]);
        this.allListingsLoaded = false;
        this.allVendorsLoaded = false;
        this._vendors$.next([]);
        this._paginationVendors$.next(paginationDefaultValue());
        this._paginationListings$.next(paginationDefaultValue(12));
    }
}
