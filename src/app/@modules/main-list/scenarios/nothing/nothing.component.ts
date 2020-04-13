import { Component, OnInit, OnDestroy } from "@angular/core";
import { VendorService } from "@services/vendor/vendor.service";

@Component({
    selector: "scenario-nothing",
    templateUrl: "./nothing.component.html",
    styleUrls: ["./nothing.component.scss"],
})
export class NothingComponent implements OnInit, OnDestroy {
    constructor(private vendorService: VendorService) {}

    ngOnInit(): void {
        this.vendorService.getVendorsInPopularLocations();
    }

    ngOnDestroy(): void {}
}
