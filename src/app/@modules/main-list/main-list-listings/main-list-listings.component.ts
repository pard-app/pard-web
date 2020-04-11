import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { Subscription, BehaviorSubject, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import { ListingService } from "@services/listing/listing.service";
import { ListingItem } from "@models/listingitem.interface";
import { LocationStore } from "@core/stores/location/location.store";

const paginationDefaultValue: { page: number; hitsPerPage: number } = {
    page: 0,
    hitsPerPage: 6,
};
@Component({
    selector: "main-list-listings",
    templateUrl: "./main-list-listings.component.html",
    styleUrls: ["./main-list-listings.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainListListingsComponent implements OnInit {
    public _listingsList$ = new BehaviorSubject<Array<ListingItem> | any>([]);
    public readonly listingsList$ = this._listingsList$.asObservable();
    private _pagination$ = new BehaviorSubject(paginationDefaultValue);
    private readonly pagination$ = this._pagination$.asObservable();
    // subscriptions
    private subscriptions = new Subscription();
    private newVendorsListingsSubscription: Subscription = new Subscription();
    private newAllListingsSubscription: Subscription = new Subscription();
    public isLoading: boolean = false;
    public allLoaded: boolean = false;

    constructor(public locationStore: LocationStore, private listingService: ListingService) {}

    ngOnInit(): void {
        // When categories come we can use combineLatest(x, y, z).pipe(map([x, y, z]));
        const subscribeToGlobalLocationChanges = this.locationStore.currentVendorIdsAtLocation$
            .pipe(debounce(() => interval(50)))
            .subscribe(async (vendorIds) => {
                // Clear up the previous: subscriptions, paginations, listings
                this.resetNecessaryAllValues();
                // create a new subscription every time vendors at location are changed
                if (vendorIds.length) {
                    this.newVendorsListingsSubscription = this.createNewVendorsListingsSubscription(vendorIds);
                } else {
                    this.newAllListingsSubscription = this.createNewAllListingsSubscription();
                }
            });
        this.subscriptions.add(subscribeToGlobalLocationChanges);
    }

    private createNewVendorsListingsSubscription(vendorIds: string[]): Subscription {
        // When categories come we can use combineLatest(x, y, z).pipe([x, y, z]);
        return this.pagination$.subscribe(async (pagination) => {
            this.isLoading = true;
            const { hits, page, nbPages } = await this.listingService
                .searchListingByVendorIds({ query: "", vendorIds: vendorIds, hitsPerPage: pagination.hitsPerPage, page: pagination.page })
                .toPromise();
            this._listingsList$.next([...this._listingsList$.getValue(), ...hits]);
            this.isLoading = false;
            if (page === nbPages - 1) this.allLoaded = true;
        });
    }

    private createNewAllListingsSubscription(): Subscription {
        return this.pagination$.subscribe(async (pagination) => {
            this.isLoading = true;
            const { hits, page, nbPages } = await this.listingService
                .searchListing({ query: "", hitsPerPage: pagination.hitsPerPage, page: pagination.page })
                .toPromise();
            this._listingsList$.next([...this._listingsList$.getValue(), ...hits]);
            this.isLoading = false;
            if (page === nbPages - 1) this.allLoaded = true;
        });
    }

    private resetNecessaryAllValues() {
        this.newVendorsListingsSubscription.unsubscribe();
        this.newAllListingsSubscription.unsubscribe();
        this._listingsList$.next([]);
        this._pagination$.next(paginationDefaultValue);
        this.allLoaded = false;
    }

    public loadMore() {
        const previousVal = this._pagination$.getValue();
        this._pagination$.next({
            ...previousVal,
            page: previousVal.page + 1,
        });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.newVendorsListingsSubscription.unsubscribe();
        this.newAllListingsSubscription.unsubscribe();
    }
}
