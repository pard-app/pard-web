import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ChangeEvent } from "places.js";
import { LocationService } from "@core/stores/location/location.service";

@Component({
    selector: "app-search-box",
    templateUrl: "./search-box.component.html",
    styleUrls: ["./search-box.component.scss"],
})
export class SearchBoxComponent implements OnInit {
    public currentCity: string = null;

    constructor(private locationService: LocationService) {}

    public currentCityOnChange(ev: ChangeEvent) {
        this.locationService.currentLocation = ev?.suggestion?.hit;
        this.currentCity = ev.suggestion.name;
        this.locationService.currentCity = ev.suggestion.name;
    }

    public onClear() {
        this.locationService.currentLocation = {} as any;
        this.currentCity = null;
        this.locationService.currentCity = null;
    }

    ngOnInit(): void {}
}
