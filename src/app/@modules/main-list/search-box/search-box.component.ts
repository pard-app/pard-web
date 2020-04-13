import { Component, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { ChangeEvent, Suggestion } from "places.js";
import { LocationStore } from "@core/stores/location/location.store";
import { of } from "rxjs";
import { ListingStore } from "@core/stores/listing/listing.store";

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

    public groupedItems$ = of([
        {
            name: "Group 1",
            children: ["Option 11", "Option 12", "Option 13"],
        },
    ]);

    constructor(private locationStore: LocationStore, private listingStore: ListingStore) {}

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

    public currentListingOrVendorOnChange(event): void {
        // Set in store
        this.listingStore.currentListingOrVendor = event;
        // Set in current component
        this.searchRequest.listingOrVendor = event;
        this.searchOnChange.emit(this.searchRequest);
    }

    ngOnInit(): void {}
}
