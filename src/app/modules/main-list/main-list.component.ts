import { Component, OnInit, OnDestroy } from "@angular/core";
import { DbServiceService } from "src/app/@features/services/db-service.service";
import { IVendor } from "@models/vendor.interface";
import { Subscriber, Observable, Subscription } from "rxjs";
import * as algoliasearch from "algoliasearch";
import { NbSearchService } from "@nebular/theme";
@Component({
  selector: "app-main-list",
  templateUrl: "./main-list.component.html",
  styleUrls: ["./main-list.component.scss"]
})
export class MainListComponent implements OnInit, OnDestroy {
  private vendorsSubscriber: Subscription;
  private listingSubscription: Subscription;
  public vendorsList: Array<IVendor>;
  public listingsList: Array<any>;
  public currentCity: string = null;
  private searchClient: any;
  private listingsIndex: any;
  private vendorsIndex: any;

  constructor(public dataService: DbServiceService) {
    this.searchClient = algoliasearch(
      "8A6TCGT3CX",
      "4ee9375d899179a0701130c2df2c1f76"
    );
    this.listingsIndex = this.searchClient.initIndex("listings");
    this.vendorsIndex = this.searchClient.initIndex("vendors");
  }

  ngOnInit(): void {
    // this.vendorsSubscriber = this.dataService.getMyListings().subscribe((items: Array<IVendor>) => {
    //     this.vendorsList = items;
    // });
    // this.listingSubscription = this.dataService.getListings().subscribe(items => {
    //     this.listingsList = items;
    // });
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
          this.vendorsList = data.hits;
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
          this.listingsList = data.hits;
        }
      });
  }

  ngOnDestroy(): void {
    // this.vendorsSubscriber.unsubscribe();
    // this.listingSubscription.unsubscribe();
  }

  onCityChange(ev) {
    this.currentCity = ev;
    this.vendorsSubscriber = this.dataService
      .getMyListings(this.currentCity)
      .subscribe((items: Array<IVendor>) => (this.vendorsList = items));
  }
}
