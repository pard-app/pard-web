import { Component, OnInit, OnDestroy } from "@angular/core";
import { DbServiceService } from "src/app/@features/services/db-service.service";
import { IVendor } from "@models/vendor.interface";
import { Subscriber, Observable, Subscription } from "rxjs";

@Component({
    selector: "app-main-list",
    templateUrl: "./main-list.component.html",
    styleUrls: ["./main-list.component.scss"]
})
export class MainListComponent implements OnInit {
    private listingSubscription: Subscription;
    public vendorsList$: Observable<Array<IVendor>>;
    public listingsList$: Observable<Array<any>>;
    public currentCity: string = null;

    constructor(public dataService: DbServiceService) {}

    ngOnInit(): void {
        this.vendorsList$ = this.dataService.getMyListings();
        console.log(this.vendorsList$);

        this.listingsList$ = this.dataService.getListings();
    }

    onCityChange(ev) {
        this.currentCity = ev;
        this.vendorsList$ = this.dataService.getMyListings(this.currentCity);
    }
}
