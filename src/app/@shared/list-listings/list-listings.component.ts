import { Component, OnInit, Input } from "@angular/core";
import { ListingItem } from "src/app/@core/models/listingitem.interface";
import { Observable } from "rxjs";

@Component({
    selector: "app-list-listings",
    templateUrl: "./list-listings.component.html",
    styleUrls: ["./list-listings.component.scss"],
})
export class ListListingsComponent implements OnInit {
    @Input() listingsList$: Observable<Array<ListingItem>>;

    constructor() {}

    ngOnInit(): void {}
}
