import { Component, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { ChangeEvent } from "places.js";
import { LocationStore } from "@core/stores/location/location.store";

@Component({
    selector: "app-search-box",
    templateUrl: "./search-box.component.html",
    styleUrls: ["./search-box.component.scss"],
})
export class SearchBoxComponent implements OnInit {
    @ViewChild("searchLocation", { static: false }) searchLocationComponent;
    public currentCity: string = this.locationStore.currentCity;

    constructor(private locationStore: LocationStore) {}

    public currentCityOnChange(ev: ChangeEvent) {
        this.locationStore.currentLocation = ev?.suggestion?.hit;
        this.currentCity = ev.suggestion.name;
        this.locationStore.currentLocationSuggestion = ev.suggestion;
    }

    public onClear() {
        this.locationStore.currentLocation = undefined;
        this.locationStore.currentLocationSuggestion = null;
        this.currentCity = null;
        this.searchLocationComponent.clearInput();
    }

    ngOnInit(): void {}
}
