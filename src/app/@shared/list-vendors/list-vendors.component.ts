import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: "app-list-vendors",
    templateUrl: "./list-vendors.component.html",
    styleUrls: ["./list-vendors.component.scss"],
})
export class ListVendorsComponent implements OnInit {
    public isLoading: boolean = true;
    @Input() vendorsWithListings$: Observable<any>;
    @Input() vendorsWithListings: Array<any>;
    @Input() title: string = "Mysterious city";

    constructor() {}

    ngOnInit(): void {}
}
