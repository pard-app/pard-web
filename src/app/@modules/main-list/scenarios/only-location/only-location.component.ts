import { Component, OnInit, OnDestroy } from "@angular/core";
import { LocationStore } from "@core/stores/location/location.store";
import { ListingService } from "@services/listing/listing.service";
import { debounce } from "rxjs/operators";
import { interval, Subscription, Observable, of, forkJoin, BehaviorSubject } from "rxjs";
import { IVendor } from "@models/vendor.interface";
import { ListingItem } from "@models/listingitem.interface";
import { VendorService } from "@services/vendor/vendor.service";
import { geoLocStr } from "@utils/index";

const paginationDefaultValue: { page: number; hitsPerPage: number } = {
    page: 0,
    hitsPerPage: 6,
};
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
    private _paginationVendors$ = new BehaviorSubject(paginationDefaultValue);
    private _paginationListings$ = new BehaviorSubject(paginationDefaultValue);
    // subscriptions
    private subscriptions = new Subscription();
    private vendorsSubscription = new Subscription();
    private listingsSubscription = new Subscription();
    // location
    public currentLocationName: string;

    constructor(public locationStore: LocationStore, private listingService: ListingService, private vendorService: VendorService) {}

    ngOnInit(): void {
        const subscribeToGlobalLocationChanges = this.locationStore.currentLocationSuggestion$
            .pipe(debounce(() => interval(50)))
            .subscribe(async ({ name, hit = {} }) => {
                this.currentLocationName = name;
                this.resetNecessaryValues();
                this.vendorsSubscription = this.createVendorsSubscription(hit._geoloc);
                this.listingsSubscription = this.createListingsSubscription(hit._geoloc);
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
            const { hits, page, nbPages } = await this.vendorService
                .searchVendor({ query: "", hitsPerPage: pagination.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(_geoloc) })
                .toPromise();
            const vendors = await this.listingService.fillVendorWithItsListings(hits);
            this._vendors$.next([...this._vendors$.getValue(), ...vendors]);
            // if (page === nbPages - 1) this.allLoaded = true;
        });
    }

    private createListingsSubscription(_geoloc): Subscription {
        return this._paginationVendors$.subscribe(async (pagination) => {
            const { hits, page, nbPages } = await this.listingService
                .searchListing({ query: "", hitsPerPage: pagination.hitsPerPage, page: pagination.page, aroundLatLng: geoLocStr(_geoloc) })
                .toPromise();
            console.log(hits);
            this._listings$.next([...this._listings$.getValue(), ...hits]);
            // if (page === nbPages - 1) this.allLoaded = true;
        });
    }

    public loadMore(): void {
        const previousVal = this._paginationVendors$.getValue();
        this._paginationVendors$.next({
            ...previousVal,
            page: previousVal.page + 1,
        });
    }
    private resetNecessaryValues(): void {
        this.listingsSubscription.unsubscribe();
        this.vendorsSubscription.unsubscribe();
        this._listings$.next([]);
        this._vendors$.next([]);
        this._paginationVendors$.next(paginationDefaultValue);
        this._paginationListings$.next(paginationDefaultValue);
    }
}
