import { Component, OnInit, Input } from "@angular/core";
import { IVendor } from "@models/vendor.interface";

@Component({
    selector: "app-card-vendor",
    templateUrl: "./card-vendor.component.html",
    styleUrls: ["./card-vendor.component.scss"]
})
export class CardVendorComponent implements OnInit {
    @Input() item: IVendor;
    constructor() {}

    ngOnInit(): void {}
}
