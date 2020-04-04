import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-search-box",
    templateUrl: "./search-box.component.html",
    styleUrls: ["./search-box.component.scss"],
})
export class SearchBoxComponent implements OnInit {
    @Output() currentCityOnChange: EventEmitter<string> = new EventEmitter();
    public currentCity: string = null;

    onCityChange(ev) {
        this.currentCity = ev;
    }
    constructor() {}

    ngOnInit(): void {}
}
