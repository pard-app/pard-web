import { Component, OnInit, Input } from "@angular/core";
import { ListingItem } from "@models/listingitem.interface";

@Component({
    selector: "app-list-listings",
    templateUrl: "./list-listings.component.html",
    styleUrls: ["./list-listings.component.scss"],
})
export class ListListingsComponent implements OnInit {
    @Input() listingsList: Array<ListingItem> = [];

    constructor() {}

    ngOnInit(): void {}
}
