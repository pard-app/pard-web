import { Component, OnInit, Input } from "@angular/core";
import { IVendor } from "src/app/@core/models/vendor.interface";
import ROUTES from "src/app/@core/constants/routing.constants";

@Component({
    selector: "app-card-vendor",
    templateUrl: "./card-vendor.component.html",
    styleUrls: ["./card-vendor.component.scss"],
})
export class CardVendorComponent implements OnInit {
    @Input() item: IVendor;
    public globalRoutes = ROUTES;

    constructor() {}

    ngOnInit(): void {}
}
