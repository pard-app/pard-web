import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ChangeEvent } from "places.js";
import { LocationStore } from "@core/stores/location/location.store";

@Component({
    selector: "app-search-box",
    templateUrl: "./search-box.component.html",
    styleUrls: ["./search-box.component.scss"],
})
export class SearchBoxComponent implements OnInit {
    public currentCity: string = this.locationStore.currentCity;

    constructor(private locationStore: LocationStore) {}

    public currentCityOnChange(ev: ChangeEvent) {
        this.locationStore.currentLocation = ev?.suggestion?.hit;
        this.currentCity = ev.suggestion.name;
        this.locationStore.currentCity = ev.suggestion.name;
    }

    public onClear() {
        this.locationStore.currentLocation = {} as any;
        this.locationStore.currentCity = null;
        this.currentCity = null;
    }

    ngOnInit(): void {}
}
