import { Component, OnInit, OnDestroy } from "@angular/core";
import { DbServiceService } from "src/app/@features/services/db-service.service";
import { IVendor } from "@models/vendor.interface";
import { Subscriber, Observable, Subscription } from "rxjs";
import * as algoliasearch from "algoliasearch";
@Component({
    selector: "app-main-list",
    templateUrl: "./main-list.component.html",
    styleUrls: ["./main-list.component.scss"]
})
export class MainListComponent implements OnInit {
    public vendorsList$: Observable<Array<IVendor>>;
    public listingsList$: Observable<Array<any>>;
    public currentCity: string = null;
    private searchClient: any;
    private listingsIndex: any = this.searchClient.initIndex("listings");
    private vendorsIndex: any = this.searchClient.initIndex("vendors");

    constructor(public dataService: DbServiceService) {
        this.searchClient = algoliasearch("8A6TCGT3CX", "4ee9375d899179a0701130c2df2c1f76");
    }

    ngOnInit(): void {
        this.search();
    }

    search(query: string = "") {
        this.vendorsIndex
            .search({
                query: query,
                hitsPerPage: 50
            })
            .then(data => {
                if (data.hits.length) {
                    console.log(data.hits);
                    this.vendorsList$ = data.hits;
                }
            });

        this.listingsIndex
            .search({
                query: query,
                hitsPerPage: 50
            })
            .then(data => {
                if (data.hits.length) {
                    console.log(data.hits);
                    this.listingsList$ = data.hits;
                }
            });
    }

    onCityChange(ev) {
        this.currentCity = ev;
        this.vendorsList$ = this.dataService.getMyListings(this.currentCity);
    }
}
