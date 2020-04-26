import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, OnInit } from "@angular/core";
import { PlacesInstance, ChangeEvent, SearchClientOptions, Hit } from "places.js";
import { LocationStore } from "@core/stores/location/location.store";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { Observable, of, Subscription, Subject, BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";
import { mapHitToLocation, mapHitsToLocations } from "@core/mappers/location.mappers";
import { ILocation } from "@models/location.interface";

// import options from "./options";
@Component({
    selector: "app-search-location",
    templateUrl: "./search-location.component.html",
    styleUrls: ["./search-location.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLocationComponent implements OnInit, OnDestroy {
    @Output() locationChanged? = new EventEmitter<ILocation>();
    @Output() onClear? = new EventEmitter();
    public input: FormControl = new FormControl();
    private placesSearchInstance: PlacesInstance = null;
    private _places$ = new BehaviorSubject<Array<ILocation>>([]);
    public readonly places$: Observable<Array<ILocation>> = this._places$.asObservable();
    private sub = new Subscription();

    constructor(private algolia: AlgoliaService) {}

    async ngOnInit() {
        const { hits } = await this.algolia.places("");
        this._places$.next(mapHitsToLocations(hits));

        this.sub = this.input.valueChanges.subscribe(async (str) => {
            if (str === undefined || typeof str === "object") return;
            !str && this.onClear.emit();
            const { hits } = await this.algolia.places(str);
            this._places$.next(mapHitsToLocations(hits));
        });
    }

    public clearInput() {
        this.input.setValue("");
        this.onClear.emit();
    }

    public onPick(location: ILocation): void {
        if (typeof location === "object") {
            this.input.setValue(location.name);
            this.locationChanged.emit(location);
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.placesSearchInstance.removeAllListeners("change");
        this.placesSearchInstance.destroy();
    }
}
