import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: "scenario-only-listing",
    templateUrl: "./only-listing.component.html",
    styleUrls: ["./only-listing.component.scss"],
})
export class OnlyListingComponent implements OnInit, OnDestroy {
    constructor() {}

    ngOnInit(): void {
        console.log("init");
    }

    ngOnDestroy(): void {
        console.log("destroy");
    }
}
