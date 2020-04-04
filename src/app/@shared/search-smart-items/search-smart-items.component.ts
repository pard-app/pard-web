import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
    selector: "app-search-smart-items",
    templateUrl: "./search-smart-items.component.html",
    styleUrls: ["./search-smart-items.component.scss"],
})
export class SearchSmartItemsComponent implements OnInit {
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
        "Lentvaris",
    ];
    filteredOptions: Observable<string[]>;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(""),
            map((value) => this._filter(value))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter((option) => option.toLowerCase().includes(filterValue));
    }

    selectCountry({ option }) {
        this.router.navigate(["/marketplace"]);
        console.log(option.value);
    }
}
