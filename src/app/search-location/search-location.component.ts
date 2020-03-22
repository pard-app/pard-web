import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
    selector: "app-search-location",
    templateUrl: "./search-location.component.html",
    styleUrls: ["./search-location.component.scss"]
})
export class SearchLocationComponent implements OnInit {
    @Output() cityChanged: EventEmitter<any> = new EventEmitter();
    myControl = new FormControl();

    options: string[] = [
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
    filteredOptions: Observable<string[]>;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(""),
            map(value => this._filter(value))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    selectCountry({ option }) {
        this.cityChanged.emit(option.value);
    }
}
