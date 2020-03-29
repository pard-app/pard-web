import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    Input,
    Type,
    SimpleChanges,
    OnChanges
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of, VirtualTimeScheduler } from "rxjs";
import { map, startWith } from "rxjs/operators";
import places from "places.js";

// import options from "./options";
const options = [
    "Vilnius",
    "Kaunas",
    "Klaipėda",
    "Šiauliai",
    "Panevėžys",
    "Alytus",
    "Marijampolė",
    "Mažeikiai",
    "Jonava",
    "Utena",
    "Kėdainiai",
    "Tauragė",
    "Telšiai",
    "Ukmergė",
    "Visaginas",
    "Plungė",
    "Kretinga",
    "Palanga",
    "Radviliškis",
    "Šilutė",
    "Gargždai",
    "Druskininkai",
    "Rokiškis",
    "Elektrėnai",
    "Kuršėnai",
    "Grigiškės",
    "Biržai",
    "Garliava",
    "Lentvaris"
];
@Component({
    selector: "app-search-location",
    templateUrl: "./search-location.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLocationComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
    // @Output() cityChanged: EventEmitter<any> = new EventEmitter();
    // public myControl = new FormControl();
    // @Output() currentText: string;
    @Output() onChange? = new EventEmitter();
    @Output() onClear? = new EventEmitter();
    // options: string[] = options;
    // filteredOptions$: Observable<string[]>;

    private instance = null;
    @ViewChild("autoInput") input;

    ngOnInit() {
        //this.filteredOptions$ = of(this.options);
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    }

    // private filter(value: string): string[] {
    //     const filterValue = value.toLowerCase();
    //     return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    // }

    // getFilteredOptions(value: string): Observable<string[]> {
    //     return of(value).pipe(map(filterString => this.filter(filterString)));
    // }

    // onSelectionChange($event) {
    //     const value: string = this.input.nativeElement.value;
    //     this.filteredOptions$ = this.getFilteredOptions(value);
    //     this.cityChanged.emit(value);
    // }

    ngAfterViewInit() {
        this.instance = places({
            container: this.input.nativeElement,
            type: "city",
            useDeviceLocation: true
        });
        this.instance.on("change", e => {
            this.onChange.emit(e);
        });

        // navigator.geolocation.getCurrentPosition(loc => {
        //    console.log(loc)
        // });
    }
    ngOnDestroy() {
        this.instance.removeAllListeners("change");
        this.instance.destroy();
    }
}
