import { Component, OnInit, OnDestroy } from "@angular/core";
import { DbServiceService } from "src/@features/services/db-service.service";
import { IVendor } from "@models/vendor.interface";
import { Subscriber, Observable, Subscription } from "rxjs";

@Component({
    selector: "app-main-list",
    templateUrl: "./main-list.component.html",
    styleUrls: ["./main-list.component.scss"]
})
export class MainListComponent implements OnInit, OnDestroy {
    private vendorsSubscriber: Subscription;
    public vendorsList: Array<IVendor>;
    public currentCity: string = null;
    constructor(public dataService: DbServiceService) {}

    ngOnInit(): void {
        this.vendorsSubscriber = this.dataService.getMyListings().subscribe((items: Array<IVendor>) => (this.vendorsList = items));
    }

    ngOnDestroy(): void {
        this.vendorsSubscriber.unsubscribe();
    }

    onCityChange(ev) {
        this.currentCity = ev;
        this.vendorsSubscriber = this.dataService.getMyListings(this.currentCity).subscribe((items: Array<IVendor>) => (this.vendorsList = items));
    }
}
