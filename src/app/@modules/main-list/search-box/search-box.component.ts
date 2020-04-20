import { Component, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { ChangeEvent, Suggestion } from "places.js";
import { LocationStore } from "@core/stores/location/location.store";
import { of, interval, BehaviorSubject, Observable, Subject } from "rxjs";
import { ListingStore } from "@core/stores/listing/listing.store";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { debounce, map, filter, flatMap, mergeMap, toArray } from "rxjs/operators";
import { SearchVendorOrListingGroup } from "@models/vendorAndListing.interface";

export class SearchRequest {
    location: Suggestion | null = null;
    listingOrVendor: string | null = null;
}

@Component({
    selector: "app-search-box",
    templateUrl: "./search-box.component.html",
    styleUrls: ["./search-box.component.scss"],
})
export class SearchBoxComponent implements OnInit {
    @ViewChild("searchLocation", { static: false }) searchLocationComponent;
    @Output() searchOnChange = new EventEmitter<SearchRequest>();
    private searchRequest: SearchRequest = new SearchRequest();
    private _groupedItems$ = new BehaviorSubject<SearchVendorOrListingGroup[]>([]);
    public groupedItems$ = this._groupedItems$.asObservable();
    private currentVendorAndListingText$ = new Subject<string>();

    constructor(private locationStore: LocationStore, private listingStore: ListingStore, private algoliaService: AlgoliaService) {}

    ngOnInit(): void {
        this.onWriteListingOrVendor("");
        this.filterOnListingOrVendorWrite();
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
        this.currentVendorAndListingText$.pipe(debounce(() => interval(300))).subscribe(async (query) => {
            console.log(query);

            const data = await this.algoliaService
                .searchVendorsAndListings(query)
                .pipe(
                    map(({ results }) => results),
                    mergeMap((results) =>
                        results.map(({ hits, index }) => ({
                            name: index,
                            children: hits.map(({ title }) => title),
                        }))
                    ),
                    filter(({ children }: SearchVendorOrListingGroup) => !!children.length),
                    toArray()
                )
                .toPromise();
            this._groupedItems$.next(data);
        });
    }

    public currentListingOrVendorOnChange(event): void {
        // Set in store
        this.listingStore.currentListingOrVendor = event;
        // Set in current component
        this.searchRequest.listingOrVendor = event;
        this.searchOnChange.emit(this.searchRequest);
    }
}
