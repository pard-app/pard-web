import { Component, OnInit, Input } from "@angular/core";
import { IVendor } from "@models/vendor.interface";
import { Observable } from "rxjs";

@Component({
    selector: "app-vendor-summary-header",
    templateUrl: "./vendor-summary-header.component.html",
    styleUrls: ["./vendor-summary-header.component.scss"]
})
export class VendorSummaryHeaderComponent implements OnInit {
    @Input() vendor$: Observable<IVendor>;

    constructor() {}

    ngOnInit(): void {}
}
