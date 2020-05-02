import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ListingItem } from "@models/listingitem.interface";
import { IVendor } from "@models/vendor.interface";

const paginationDefaultValue = (pp = 6) => ({
    page: 0,
    hitsPerPage: pp,
});

@Injectable({
    providedIn: "root",
})
export class ScenariosStore implements OnDestroy {
    // Listing/vendor Behavior subjects (set only)
    private _listings$: BehaviorSubject<ListingItem[]> = new BehaviorSubject([]);
    private _vendors$: BehaviorSubject<IVendor[]> = new BehaviorSubject([]);
    // listing/vendor observables
    public readonly listings$: Observable<ListingItem[]> = this._listings$.asObservable();
    public readonly vendors$: Observable<IVendor[]> = this._vendors$.asObservable();
    // Pagination handlers
    private _paginationVendors$ = new BehaviorSubject(paginationDefaultValue());
    private _paginationListings$ = new BehaviorSubject(paginationDefaultValue(12));
    // Pagination observables
    public readonly paginationVendors$ = this._paginationVendors$.asObservable();
    public readonly paginationListings$ = this._paginationListings$.asObservable();
    // sub
    public subscriptions = new Subscription();
    public vendorsSubscription = new Subscription();
    public listingsSubscription = new Subscription();
    // pagination
    public allListingsLoaded: boolean = false;
    public allVendorsLoaded: boolean = false;
    // loaders
    public isLoadingListings: boolean;
    public isLoadingVendors: boolean;

    // template data
    public currentListingOrVendor: string;
    public currentLocation: string;

    public pushToListings(listings): void {
        this._listings$.next([...this._listings$.getValue(), ...listings]);
    }

    public pushToVendors(vendors): void {
        this._vendors$.next([...this._vendors$.getValue(), ...vendors]);
    }

    public resetNecessaryValues(): void {
        this._listings$.next([]);
        this._vendors$.next([]);
        this.listingsSubscription.unsubscribe();
        this.vendorsSubscription.unsubscribe();
        this.allListingsLoaded = false;
        this.allVendorsLoaded = false;
        this.isLoadingListings = false;
        this.isLoadingVendors = false;
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
        this.vendorsSubscription.unsubscribe();
        this.listingsSubscription.unsubscribe();
    }
}
