import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: "scenario-nothing",
    templateUrl: "./nothing.component.html",
    styleUrls: ["./nothing.component.scss"],
})
export class NothingComponent implements OnInit, OnDestroy {
    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
