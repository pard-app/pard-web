import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy, SimpleChanges, OnChanges } from "@angular/core";
import places, { PlacesInstance } from "places.js";

// import options from "./options";
@Component({
    selector: "app-search-location",
    templateUrl: "./search-location.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLocationComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild("autoInput") input;
    @Output() onChange? = new EventEmitter();
    @Output() onClear? = new EventEmitter();

    private instance: PlacesInstance = null;

    ngOnInit() {
        //this.filteredOptions$ = of(this.options);
    }

    ngAfterViewInit() {
        this.instance = places({
            container: this.input.nativeElement,
            type: "city",
            useDeviceLocation: true,
        });

        this.instance.on("change", (e) => {
            this.onChange.emit(e);
        });

        navigator.geolocation.getCurrentPosition((loc) => {
            console.log(loc);
        });
    }

    ngOnDestroy() {
        this.instance.removeAllListeners("change");
        this.instance.destroy();
    }
}
