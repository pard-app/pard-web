import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from "@angular/core";
import { ChangeEvent, Suggestion } from "places.js";
import { LocationStore } from "@core/stores/location/location.store";
import { interval, BehaviorSubject, Subject, Subscription, combineLatest } from "rxjs";
import { ListingStore } from "@core/stores/listing/listing.store";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { debounce, map, filter, flatMap, mergeMap, toArray } from "rxjs/operators";
import { SearchVendorOrListingGroup } from "@models/vendorAndListing.interface";
import { Router } from "@angular/router";
import { geoLocStr } from "@utils/index";

export class SearchRequest {
    location: Suggestion | null = null;
    listingOrVendor: string | null = null;
}

@Component({
    selector: "app-search-box",
    templateUrl: "./search-box.component.html",
    styleUrls: ["./search-box.component.scss"],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
    @ViewChild("searchLocation", { static: false }) searchLocationComponent;
    @Output() searchOnChange = new EventEmitter<SearchRequest>();
    private searchRequest: SearchRequest = new SearchRequest();
    private _groupedItems$ = new BehaviorSubject<SearchVendorOrListingGroup[]>([]);
    public groupedItems$ = this._groupedItems$.asObservable();
    private currentVendorAndListingText$ = new Subject<string>();
    private sub = new Subscription();
    public currentLocationName: string = "";

    constructor(private locationStore: LocationStore, private listingStore: ListingStore, private algoliaService: AlgoliaService, private router: Router) {}

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
        this.locationStore.currentLocation = undefined;
        this.locationStore.currentLocationSuggestion = null;
        // Clear component
        this.searchLocationComponent.clearInput();
        this.searchRequest.location = null;
        this.searchOnChange.emit(this.searchRequest);
    }

    public onClearListingOrVendor(): void {
        // Clear store
        this.listingStore.currentListingOrVendor = null;
        // Clear component
        this.searchRequest.listingOrVendor = null;
        this.searchOnChange.emit(this.searchRequest);
    }

    public currentLocationOnChange({ suggestion }: ChangeEvent): void {
        // Set in store
        this.locationStore.currentLocation = suggestion?.hit;
        this.locationStore.currentLocationSuggestion = suggestion;
        // Set in current component
        this.searchRequest.location = suggestion;
        this.searchOnChange.emit(this.searchRequest);
    }

    public onWriteListingOrVendor(query: string) {
        this.currentVendorAndListingText$.next(query);
    }

    private async filterOnListingOrVendorWrite() {
        this.sub = combineLatest([this.currentVendorAndListingText$, this.locationStore.currentLocation$])
            .pipe(debounce(() => interval(300)))
            .subscribe(async ([query, location]) => {
                const opts = location ? { aroundLatLng: geoLocStr(location._geoloc), aroundRadius: 40000 } : {};
                if (location && location.locale_names[0]) {
                    this.currentLocationName = `(${location.locale_names[0]})`;
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
            this.router.navigate(["/vendor/" + vendor + "/" + objectID]);
        } else if (type === "vendors") {
            this.router.navigate(["/vendor/" + objectID]);
        }
    }

    public onClickSearchVendorOrListingButton(text): void {
        // Set in store
        this.listingStore.currentListingOrVendor = text;
        // Set in current component
        this.searchRequest.listingOrVendor = text;
        this.searchOnChange.emit(this.searchRequest);
    }
}
