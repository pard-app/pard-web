import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: "main-list-vendors",
    templateUrl: "./main-list-vendors.component.html",
    styleUrls: ["./main-list-vendors.component.scss"],
})
export class MainListVendorsComponent implements OnInit {
    public isLoading: boolean = true;
    @Input() vendorsWithListings$: Observable<any>;
    @Input() title: string = "Mysterious city";

    constructor() {}

    ngOnInit(): void {}
}
