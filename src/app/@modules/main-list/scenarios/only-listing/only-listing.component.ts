import { Component, OnInit, OnDestroy } from "@angular/core";
import { ListingService } from "@services/listing/listing.service";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingStore } from "@core/stores/listing/listing.store";
import { throttleTime } from "rxjs/operators";
import { Subscription, BehaviorSubject, Observable } from "rxjs";
import { ListingItem } from "@models/listingitem.interface";
import { IVendor } from "@models/vendor.interface";
import { noPagesLeft, geoLocStr } from "@utils/index";

const paginationDefaultValue = (pp = 6) => ({
    page: 0,
    hitsPerPage: pp,
});
@Component({
    selector: "scenario-only-listing",
    templateUrl: "./only-listing.component.html",
    styleUrls: ["./only-listing.component.scss"],
})
export class OnlyListingComponent implements OnInit, OnDestroy {
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

    constructor(private listingService: ListingService, private vendorService: VendorService, private listingStore: ListingStore) {}

    ngOnInit(): void {
        const subscribeToGlobalListingOrVendor = this.listingStore.currentListingOrVendor$.pipe(throttleTime(1000)).subscribe(async (listingOrVendorText) => {
            this.currentListingOrVendor = listingOrVendorText;
            this.resetNecessaryValues();
            this.vendorsSubscription = this.createVendorsSubscription(listingOrVendorText);
            this.listingsSubscription = this.createListingsSubscription(listingOrVendorText);
        });

        this.subscriptions.add(subscribeToGlobalListingOrVendor);
    }

    private createVendorsSubscription(listingOrVendorText): Subscription {
        return this._paginationVendors$.subscribe(async (pagination) => {
            const { hits, page, nbPages } = await this.vendorService
                .searchVendor({ query: listingOrVendorText, hitsPerPage: pagination.hitsPerPage, page: pagination.page })
                .toPromise();
            const vendors = await this.listingService.fillVendorWithItsListings(hits);
            this._vendors$.next([...this._vendors$.getValue(), ...vendors]);
            this.allVendorsLoaded = noPagesLeft(page, nbPages);
        });
    }

    private createListingsSubscription(listingOrVendorText): Subscription {
        return this._paginationListings$.subscribe(async (pagination) => {
            const { hits, page, nbPages } = await this.listingService
                .searchListing({ query: listingOrVendorText, hitsPerPage: pagination.hitsPerPage, page: pagination.page })
                .toPromise();
            this._listings$.next([...this._listings$.getValue(), ...hits]);
            this.allListingsLoaded = noPagesLeft(page, nbPages);
        });
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

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
