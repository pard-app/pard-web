import { Component, OnInit, Input } from "@angular/core";
import { IVendor } from "@models/vendor.interface";
import { Observable } from "rxjs";

@Component({
    selector: "app-vendor-delivery-notice",
    templateUrl: "./vendor-delivery-notice.component.html",
    styleUrls: ["./vendor-delivery-notice.component.scss"],
})
export class VendorDeliveryNoticeComponent implements OnInit {
    @Input() vendor$: Observable<IVendor>;
    constructor() {}

    ngOnInit(): void {}
}
