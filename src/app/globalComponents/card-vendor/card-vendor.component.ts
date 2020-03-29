import { Component, OnInit, Input } from "@angular/core";
import { IVendor } from "@models/vendor.interface";
import ROUTES from "@constants/routing.constants";

@Component({
    selector: "app-card-vendor",
    templateUrl: "./card-vendor.component.html",
    styleUrls: ["./card-vendor.component.scss"]
})
export class CardVendorComponent implements OnInit {
    @Input() item: IVendor;
    public globalRoutes = ROUTES;

    constructor() {}

    ngOnInit(): void {}
}
