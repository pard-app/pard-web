import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { IVendor } from "src/app/@core/models/vendor.interface";
import { ROUTING_CONSTANTS } from "src/app/@core/constants/routing.constants";

@Component({
    selector: "app-card-vendor",
    templateUrl: "./card-vendor.component.html",
    styleUrls: ["./card-vendor.component.scss"],
})
export class CardVendorComponent {
    @Input() item: IVendor;
    public globalRoutes = ROUTING_CONSTANTS;

    constructor() {}
}
