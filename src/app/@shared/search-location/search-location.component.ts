import { Component, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import places, { PlacesInstance, ChangeEvent } from "places.js";
import { LocationStore } from "@core/stores/location/location.store";

// import options from "./options";
@Component({
    selector: "app-search-location",
    templateUrl: "./search-location.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLocationComponent implements AfterViewInit, OnDestroy {
    @ViewChild("autoInput") input;
    @Output() cityChanged? = new EventEmitter<ChangeEvent>();
    @Output() onClear? = new EventEmitter();
    private placesSearchInstance: PlacesInstance = null;

    constructor(private locationStore: LocationStore) {}

    ngAfterViewInit() {
        this.placesSearchInstance = places({
            container: this.input.nativeElement,
            type: "city",
            useDeviceLocation: true,
        });

        this.placesSearchInstance.on("change", (suggestion: ChangeEvent) => {
            this.cityChanged.emit(suggestion);
        });

        this.placesSearchInstance.on("clear", () => {
            this.onClear.emit();
        });
    }

    clearInput() {
        this.input.nativeElement.value = "";
    }

    ngOnDestroy() {
        this.placesSearchInstance.removeAllListeners("change");
        this.placesSearchInstance.destroy();
    }
}
