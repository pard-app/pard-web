import { Component, OnInit, OnDestroy } from "@angular/core";
import { IVendor } from "src/app/@core/models/vendor.interface";
import { Observable, Subscription, interval } from "rxjs";
import { map } from "rxjs/operators";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingItem } from "@models/listingitem.interface";
import { LocationStore } from "@core/stores/location/location.store";
import { geoLocStr } from "@utils/index";

@Component({
    selector: "main-list-vendors",
    templateUrl: "./main-list-vendors.component.html",
    styleUrls: ["./main-list-vendors.component.scss"],
})
export class MainListVendorsComponent implements OnInit {
    public vendorsList$ = new Observable<Array<IVendor> | any>();
    public listingsList$ = new Observable<Array<ListingItem> | any>();
    public subscriptions = new Subscription();
    public isLoading: boolean = true;

    constructor(public locationStore: LocationStore, public vendorService: VendorService) {}

    ngOnInit(): void {
        this.searchVendorData({});
    }

    private searchVendorData({ query = "" }) {
        const locationSub = this.locationStore.currentLocation$.subscribe((location) => {
            if (location && location._geoloc) {
                this.vendorsList$ = this.vendorService.searchVendor({ query, aroundLatLng: geoLocStr(location._geoloc) }).pipe(
                    map(({ hits }) => {
                        this.isLoading = false;
                        this.locationStore.currentVendorIdsAtLocation = hits.map(({ objectID }) => objectID);
                        return hits;
                    })
                );
                this.isLoading = true;
            } else {
                this.locationStore.currentVendorIdsAtLocation = [];
                this.vendorsList$ = this.vendorService.searchVendor({ query }).pipe(
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
