import { Component, OnInit, OnDestroy } from "@angular/core";
import { IVendor } from "src/app/@core/models/vendor.interface";
import { Observable, Subscription } from "rxjs";
import { Params } from "@angular/router";
import { map } from "rxjs/operators";
import { ListingService } from "@services/listing/listing.service";
import { ListingItem } from "@models/listingitem.interface";
import { LocationStore } from "@core/stores/location/location.store";

@Component({
    selector: "main-list-listings",
    templateUrl: "./main-list-listings.component.html",
    styleUrls: ["./main-list-listings.component.scss"],
})
export class MainListListingsComponent implements OnInit {
    public vendorsList$ = new Observable<Array<IVendor> | any>();
    public listingsList$ = new Observable<Array<ListingItem> | any>();
    public subscriptions = new Subscription();
    public currentActiveTab$: Observable<Params>;
    public isLoading: boolean = false;

    constructor(public locationStore: LocationStore, private listingService: ListingService) {}

    ngOnInit(): void {
        this.searchListingsData({});
    }

    private searchListingsData({ query = "" }) {
        const locationSub = this.locationStore.currentVendorIdsAtLocation$.subscribe((vendorIds) => {
            if (vendorIds && vendorIds.length) {
                this.listingsList$ = this.listingService.searchListingByVendorsIds({ query, vendorIds }).pipe(
                    map(({ hits }) => {
                        this.isLoading = false;
                        return hits;
                    })
                );
            } else {
                this.listingsList$ = this.listingService.searchListing({ query }).pipe(
                    map(({ hits }) => {
                        this.isLoading = false;
                        return hits;
                    })
                );
            }
            this.isLoading = true;
        });
        this.subscriptions.add(locationSub);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
