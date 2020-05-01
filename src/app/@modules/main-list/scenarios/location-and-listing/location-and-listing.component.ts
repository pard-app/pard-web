import { Component, OnInit, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, combineLatest } from "rxjs";
import { ListingItem } from "@models/listingitem.interface";
import { IVendor } from "@models/vendor.interface";
import { ListingService } from "@services/listing/listing.service";
import { VendorService } from "@services/vendor/vendor.service";
import { filter } from "rxjs/operators";
import { ListingStore } from "@core/stores/listing/listing.store";
import { noPagesLeft, geoLocStr } from "@utils/index";
import { LocationStore } from "@core/stores/location/location.store";
import { ILocation } from "@models/location.interface";

const paginationDefaultValue = (pp = 6) => ({
    page: 0,
    hitsPerPage: pp,
});
@Component({
    selector: "scenario-location-and-listing",
    templateUrl: "./location-and-listing.component.html",
    styleUrls: ["./location-and-listing.component.scss"],
})
export class LocationAndListingComponent implements OnInit, OnDestroy {
    // subjects (set only)
    private _listings$: BehaviorSubject<ListingItem[]> = new BehaviorSubject([]);
    private _vendors$: BehaviorSubject<IVendor[]> = new BehaviorSubject([]);
    // observables
    public readonly listings$: Observable<ListingItem[]> = this._listings$.asObservable();
    public readonly vendors$: Observable<IVendor[]> = this._vendors$.asObservable();
    // pagination handlers
    private _paginationVendors$ = new BehaviorSubject(paginationDefaultValue());
    private _paginationListings$ = new BehaviorSubject(paginationDefaultValue(12));
    // sub
    private subscriptions = new Subscription();
    private vendorsSubscription = new Subscription();
    private listingsSubscription = new Subscription();
    // pagination
    public allListingsLoaded: boolean = false;
    public allVendorsLoaded: boolean = false;
    // template data
    public currentListingOrVendor: string;
    public currentLocation: string;

    constructor(
        private listingService: ListingService,
        private vendorService: VendorService,
        private listingStore: ListingStore,
        private locationStore: LocationStore
    ) {}

    ngOnInit(): void {
        const subscribeToGlobalListingOrVendor = combineLatest([this.locationStore.currentLocation$, this.listingStore.currentListingOrVendor$])
            .pipe(filter((combinedItems: [ILocation, string]) => !combinedItems.some((val) => !val)))
            .subscribe(async ([location, listingOrVendorText]) => {
                this.resetNecessaryValues();
                this.currentListingOrVendor = listingOrVendorText;
                this.currentLocation = location.name;
                this.vendorsSubscription = this.createVendorsSubscription(listingOrVendorText, location._geoloc);
                this.listingsSubscription = this.createListingsSubscription(listingOrVendorText, location._geoloc);
            });

        this.subscriptions.add(subscribeToGlobalListingOrVendor);
    }

    private createVendorsSubscription(listingOrVendorText, geoloc): Subscription {
        return this._paginationVendors$.subscribe(async (pagination) => {
            const { hits, page, nbPages } = await this.vendorService
                .searchVendor({ query: listingOrVendorText, hitsPerPage: pagination.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(geoloc) })
                .toPromise();
            const vendors = await this.listingService.fillVendorWithItsListings(hits);
            this._vendors$.next([...this._vendors$.getValue(), ...vendors]);
            this.allVendorsLoaded = noPagesLeft(page, nbPages);
        });
    }

    private createListingsSubscription(listingOrVendorText, geoloc): Subscription {
        return this._paginationListings$.subscribe(async (pagination) => {
            const { hits, page, nbPages } = await this.listingService
                .searchListing({ query: listingOrVendorText, hitsPerPage: pagination.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(geoloc) })
                .toPromise();
            this._listings$.next([...this._listings$.getValue(), ...hits]);
            this.allListingsLoaded = noPagesLeft(page, nbPages);
        });
    }

    private resetNecessaryValues(): void {
        this._listings$.next([]);
        this._vendors$.next([]);
        this.listingsSubscription.unsubscribe();
        this.vendorsSubscription.unsubscribe();
        this.allListingsLoaded = false;
        this.allVendorsLoaded = false;
        this._paginationVendors$.next(paginationDefaultValue());
        this._paginationListings$.next(paginationDefaultValue(12));
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

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
