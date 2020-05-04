import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { ListingItem } from "src/app/@core/models/listingitem.interface";
import { Observable } from "rxjs";

@Component({
    selector: "app-list-listings",
    templateUrl: "./list-listings.component.html",
    styleUrls: ["./list-listings.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListListingsComponent implements OnInit {
    @Input() isLoading: boolean = true;
    @Input() listingsList$: Observable<Array<ListingItem>>;
    @Input() title: string = "Mysterious listings";

    constructor() {}

    ngOnInit(): void {}
}
