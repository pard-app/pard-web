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

    currentCityOnChange(ev: ChangeEvent) {
        console.log(ev);
        this.locationService.currentLocation = ev?.suggestion?.hit;
    }

    ngOnInit(): void {}
}
