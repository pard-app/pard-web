import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
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
export class SearchLocationComponent implements OnInit {
    @Output() cityChanged: EventEmitter<any> = new EventEmitter();
    public myControl = new FormControl();
    @Output() currentText: string;

    options: string[] = options;
    filteredOptions$: Observable<string[]>;

    @ViewChild("autoInput") input;

    ngOnInit() {
        this.filteredOptions$ = of(this.options);
    }

    private filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    }

    getFilteredOptions(value: string): Observable<string[]> {
        return of(value).pipe(map(filterString => this.filter(filterString)));
    }

    onSelectionChange($event) {
        const value: string = this.input.nativeElement.value;
        this.filteredOptions$ = this.getFilteredOptions(value);
        this.cityChanged.emit(value);
    }
}
