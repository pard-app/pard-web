import { Component, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import places, { PlacesInstance, ChangeEvent, SearchClientOptions } from "places.js";
import { LocationStore } from "@core/stores/location/location.store";
import { AlgoliaService } from "@services/algolia/algolia.service";

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

    constructor(private algolia: AlgoliaService) {}

    ngAfterViewInit() {
        this.placesSearchInstance = places({
            container: this.input.nativeElement,
            type: "city",
            countries: ["lt"],
        });

        this.algolia.places("Kaun", {}).then((x) => console.log(x));

        this.placesSearchInstance.on("change", (suggestion: ChangeEvent) => {
            this.locationChanged.emit(suggestion);
        });

        this.placesSearchInstance.on("clear", () => {
            this.onClear.emit();
        });
    }

    clearInput() {
        this.placesSearchInstance.setVal("");
    }

    ngOnDestroy() {
        this.placesSearchInstance.removeAllListeners("change");
        this.placesSearchInstance.destroy();
    }
}
