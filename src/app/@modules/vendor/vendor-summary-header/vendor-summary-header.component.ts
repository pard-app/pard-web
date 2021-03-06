import { Component, OnInit, Input } from "@angular/core";
import { IVendor } from "src/app/@core/models/vendor.interface";
import { Observable } from "rxjs";

@Component({
    selector: "app-vendor-summary-header",
    templateUrl: "./vendor-summary-header.component.html",
    styleUrls: ["./vendor-summary-header.component.scss"],
})
export class VendorSummaryHeaderComponent {
    @Input() vendor$: Observable<IVendor>;
    @Input() noMargin: boolean;

    constructor() {}
}
