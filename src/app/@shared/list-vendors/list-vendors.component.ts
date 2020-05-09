import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: "app-list-vendors",
    templateUrl: "./list-vendors.component.html",
    styleUrls: ["./list-vendors.component.scss"],
})
export class ListVendorsComponent implements OnInit {
    @Input() isLoading: boolean = true;
    @Input() vendorsWithListings$: Observable<any>;
    @Input() vendorsWithListings: Array<any>;
    @Input() title: string = "Mysterious city";
    @Input() secondaryTitle: string;
    @Output() secondaryTitleOnClick: EventEmitter<void | string> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
}
