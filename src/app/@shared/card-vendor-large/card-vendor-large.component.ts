import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { IVendor } from "src/app/@core/models/vendor.interface";
import { ROUTING_CONSTANTS } from "src/app/@core/constants/routing.constants";

@Component({
    selector: "app-card-vendor-large",
    templateUrl: "./card-vendor-large.component.html",
    styleUrls: ["./card-vendor-large.component.scss"],
})
export class CardVendorLargeComponent {
    @Input() item: IVendor;
    public globalRoutes = ROUTING_CONSTANTS;

    constructor() {}
}
