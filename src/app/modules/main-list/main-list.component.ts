import { Component, OnInit, OnDestroy } from "@angular/core";
import { DbServiceService } from "src/app/@features/services/db-service.service";
import { IVendor } from "@models/vendor.interface";
import { Subscriber, Observable, Subscription, BehaviorSubject } from "rxjs";
import * as algoliasearch from "algoliasearch";
import { environment } from "src/environments/environment";
@Component({
    selector: "app-main-list",
    templateUrl: "./main-list.component.html",
    styleUrls: ["./main-list.component.scss"]
})
export class MainListComponent implements OnInit {
    public _vendorsList$ = new BehaviorSubject<Array<IVendor>>([]);
    public _listingsList$ = new BehaviorSubject<Array<any>>([]);
    public currentCity: string = null;
    private searchClient: any = algoliasearch(environment.algoliaConfig.appId, environment.algoliaConfig.apiKey);
    private listingsIndex: algoliasearch.Index = this.searchClient.initIndex("listings");
    private vendorsIndex: algoliasearch.Index = this.searchClient.initIndex("vendors");

    constructor(public dataService: DbServiceService) {}

    ngOnInit(): void {
        this.searchVendorData();
        this.searchListingsData();
    }

    private async searchVendorData(query: string = "") {
        const vendorSearchData = await this.vendorsIndex.search({
            query: query,
            hitsPerPage: 50
        });

        if (vendorSearchData.hits.length) {
            this._vendorsList$.next(vendorSearchData.hits);
        }
    }

    private async searchListingsData(query: string = "") {
        const listingsSearchData = await this.listingsIndex.search({
            query: query,
            hitsPerPage: 50
        });
        if (listingsSearchData.hits.length) {
            console.log(listingsSearchData.hits);
            this._listingsList$.next(listingsSearchData.hits);
        }
    }

    onCityChange(ev) {
        this.currentCity = ev;
        console.log(ev);

        // this.vendorsList$ = this.dataService.getMyListings(this.currentCity);
    }
}
