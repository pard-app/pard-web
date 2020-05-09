import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, OnInit, ViewChild, ElementRef } from "@angular/core";
import { LocationStore } from "@core/stores/location/location.store";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { Observable, Subscription, Subject, BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";
import { mapHitsToLocations } from "@core/mappers/location.mappers";
import { ILocation } from "@models/location.interface";
import { filter } from "rxjs/operators";

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
    @ViewChild("autoInput") inputRef: ElementRef;
    public input: FormControl = new FormControl();
    private _places$ = new BehaviorSubject<Array<ILocation>>([]);
    public readonly places$: Observable<Array<ILocation>> = this._places$.asObservable();
    private sub = new Subscription();

    constructor(private algolia: AlgoliaService, private locationStore: LocationStore) {}

    async ngOnInit() {
        this.sub.add(
            this.locationStore.currentLocation$
                .pipe(
                    filter((x) => {
                        const hasValue = !!x;
                        !hasValue && this.clearInput();
                        !hasValue && this.inputRef && this.inputRef.nativeElement.blur();
                        return hasValue;
                    })
                )
                .subscribe((x) => this.onPick(x))
        );
        const { hits } = await this.algolia.places("");
        this._places$.next(mapHitsToLocations(hits));

        this.sub.add(
            this.input.valueChanges.subscribe(async (str) => {
                if (str === undefined || typeof str === "object") return;
                !str && this.onClear.emit();
                const { hits } = await this.algolia.places(str);
                this._places$.next(mapHitsToLocations(hits));
            })
        );
    }

    public clearInput() {
        this.input.setValue("");
        this.onClear.emit();
    }

    public onPick(location: ILocation): void {
        if (typeof location === "object") {
            this.input.setValue(location.name);
            this.inputRef.nativeElement.blur();
            this.locationChanged.emit(location);
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
