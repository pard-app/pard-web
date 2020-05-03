import { Component, OnInit, OnDestroy } from "@angular/core";
import { LocationStore } from "@core/stores/location/location.store";
import { interval, BehaviorSubject, Subject, Subscription, combineLatest } from "rxjs";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { debounce, map, filter, flatMap, mergeMap, toArray } from "rxjs/operators";
import { SearchVendorOrListingGroup } from "@models/vendorAndListing.interface";
import { Router } from "@angular/router";
import { geoLocStr } from "@utils/index";
import { ROUTING_CONSTANTS, locationQueryParams, QUERY_PARAMS } from "src/app/@core/constants/routing.constants";
import { ILocation } from "@models/location.interface";
import { MainSearchStore, SearchRequest } from "@core/stores/mainsearch/mainsearch.store";

@Component({
    selector: "app-search-box",
    templateUrl: "./search-box.component.html",
    styleUrls: ["./search-box.component.scss"],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    private _groupedItems$ = new BehaviorSubject<SearchVendorOrListingGroup[]>([]);
    public groupedItems$ = this._groupedItems$.asObservable();
    private currentVendorAndListingText$ = new Subject<string>();
    private sub = new Subscription();
    public currentLocationName: string = "";

    constructor(
        private locationStore: LocationStore,
        private algoliaService: AlgoliaService,
        private router: Router,
        private mainSearchStore: MainSearchStore
    ) {}

    ngOnInit(): void {
        this.filterOnListingOrVendorWrite();
        // initiate first search an empty string (searches for all)
        this.onWriteListingOrVendor("");
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public onClearCity(): void {
        // Clear store
        this.router.navigate([ROUTING_CONSTANTS.ROOT], locationQueryParams({ [QUERY_PARAMS.LOCATION]: null }));
        // Clear component
        this.mainSearchStore.searchChange({ location: null });
    }

    public onClearListingOrVendor(): void {
        // Clear store
        this.router.navigate([ROUTING_CONSTANTS.ROOT], locationQueryParams({ [QUERY_PARAMS.VENDORORLISTING]: null }));
        // Clear component
        this.mainSearchStore.searchChange({ listingOrVendor: null });
    }

    public currentLocationOnChange(location: ILocation): void {
        // Set in store
        this.router.navigate([ROUTING_CONSTANTS.ROOT], locationQueryParams({ [QUERY_PARAMS.LOCATION]: location.objectID }));
        // Set in current component
        this.mainSearchStore.searchChange({ location });
    }

    public onClickSearchVendorOrListingButton(text): void {
        // Set in store
        this.router.navigate([ROUTING_CONSTANTS.ROOT], locationQueryParams({ [QUERY_PARAMS.VENDORORLISTING]: text }));
        // Set in current component
        this.mainSearchStore.searchChange({ listingOrVendor: text });
    }

    public onWriteListingOrVendor(query: string) {
        this.currentVendorAndListingText$.next(query);
    }

    private async filterOnListingOrVendorWrite() {
        this.sub = combineLatest([this.currentVendorAndListingText$, this.locationStore.currentLocation$])
            .pipe(debounce(() => interval(300)))
            .subscribe(async ([query, location]) => {
                const opts = location ? { aroundLatLng: geoLocStr(location._geoloc), aroundRadius: 40000 } : {};
                if (location && location.name) {
                    this.currentLocationName = `(${location.name})`;
                } else {
                    this.currentLocationName = "";
                }

                const data = await this.algoliaService
                    .searchVendorsAndListings(query, opts)
                    .pipe(
                        map(({ results }) => results),
                        mergeMap((results) =>
                            results.map(({ hits, index }) => ({
                                name: index,
                                children: hits.map(({ title, image, description, objectID, vendor }) => ({
                                    title,
                                    image,
                                    description,
                                    objectID,
                                    type: index,
                                    vendor,
                                })),
                            }))
                        ),
                        filter(({ children }: SearchVendorOrListingGroup) => !!children.length),
                        toArray()
                    )
                    .toPromise();
                this._groupedItems$.next(data);
            });
    }

    public listingOrVendorClicked({ type, title, objectID, vendor }): void {
        if (type === "listings") {
            this.router.navigate(["/" + ROUTING_CONSTANTS.VENDOR_PAGE_ROOT + "/" + vendor + "/" + objectID]);
        } else if (type === "vendors") {
            this.router.navigate(["/" + ROUTING_CONSTANTS.VENDOR_PAGE_ROOT + "/" + objectID]);
        }
    }
}
