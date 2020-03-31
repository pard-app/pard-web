import { Component, OnInit, OnDestroy } from "@angular/core";
import { DbServiceService } from "@services/db-service/db-service.service";
import { IVendor } from "@models/vendor.interface";
import { Observable, BehaviorSubject } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";
@Component({
    selector: "app-main-list",
    templateUrl: "./main-list.component.html",
    styleUrls: ["./main-list.component.scss"]
})
export class MainListComponent implements OnInit {
    public _vendorsList$ = new BehaviorSubject<Array<IVendor>>([]);
    public _listingsList$ = new BehaviorSubject<Array<any>>([]);
    public currentCity: string = null;
    public currentActiveTab$: Observable<Params>;

    constructor(public vendorService: VendorService, private listingService: ListingService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.currentActiveTab$ = this.route.queryParams.pipe(map(params => params));
        this.searchVendorData();
        this.searchListingsData();
    }

    private async searchVendorData(query: string = "") {
        const vendorSearchData = await this.vendorService.searchVendor(query);

        if (vendorSearchData.hits.length) {
            this._vendorsList$.next(vendorSearchData.hits);
        }
    }

    private async searchListingsData(query: string = "") {
        const listingsSearchData = await this.listingService.searchListing(query);

        if (listingsSearchData.hits.length) {
            console.log(listingsSearchData.hits);
            this._listingsList$.next(listingsSearchData.hits);
        }
    }

    changeTab({ tabId }) {
        this.router.navigate([], { queryParams: { view: tabId } });
    }

    onCityChange(ev) {
        this.currentCity = ev;
        console.log(ev);
    }
}
