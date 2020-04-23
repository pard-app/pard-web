import { Component, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import places, { PlacesInstance, ChangeEvent } from "places.js";
import { LocationStore } from "@core/stores/location/location.store";

// import options from "./options";
@Component({
    selector: "app-search-location",
    templateUrl: "./search-location.component.html",
    styleUrls: ["./search-location.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLocationComponent implements AfterViewInit, OnDestroy {
    @ViewChild("autoInput") input;
    @Output() locationChanged? = new EventEmitter<ChangeEvent>();
    @Output() onClear? = new EventEmitter();
    private placesSearchInstance: PlacesInstance = null;

    constructor() {}

    ngAfterViewInit() {
        this.placesSearchInstance = places({
            container: this.input.nativeElement,
            type: "city",
            countries: ["lt"],
        });

        this.placesSearchInstance.on("change", (suggestion: ChangeEvent) => {
            this.locationChanged.emit(suggestion);
        });

        this.placesSearchInstance.on("clear", () => {
            this.onClear.emit();
        });
    }
    getMyLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    clearInput() {
        this.placesSearchInstance.setVal("");
    }

    ngOnDestroy() {
        this.placesSearchInstance.removeAllListeners("change");
        this.placesSearchInstance.destroy();
    }
}
