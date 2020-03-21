import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
    selector: "app-hello-page",
    templateUrl: "./hello-page.component.html",
    styleUrls: ["./hello-page.component.scss"]
})
export class HelloPageComponent implements OnInit {
    myControl = new FormControl();
    options: string[] = ["One", "Two", "Three"];
    filteredOptions: Observable<string[]>;

    constructor() {}

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
}
