import { Component, OnInit, OnDestroy } from "@angular/core";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";
import { of, Observable } from "rxjs";
import { map, mergeMap, flatMap, concatMap, mergeAll, concatAll, tap, toArray } from "rxjs/operators";
import { IVendor } from "@models/vendor.interface";
import { HttpClient } from "@angular/common/http";
import { ListingItem } from "@models/listingitem.interface";

@Component({
    selector: "scenario-nothing",
    templateUrl: "./nothing.component.html",
    styleUrls: ["./nothing.component.scss"],
})
export class NothingComponent implements OnInit, OnDestroy {
    public topVendorsInLocations$: Observable<any> = of([]);
    public topVendorsNearMe$: Observable<Array<IVendor>>;
    public topListingsNearMe$: Observable<Array<ListingItem>>;

    constructor(private vendorService: VendorService, private listingService: ListingService, private http: HttpClient) {}

    async ngOnInit() {
        this.handleTopNearMe();
        this.handleTopVendorsInLocations();
    }

    private async handleTopNearMe() {
        const { cityLatLong } = (await this.http.get("https://europe-west1-pard-app.cloudfunctions.net/geolocation").toPromise()) as { cityLatLong: string };
        this.topVendorsNearMe$ = this.vendorService
            .searchVendor({ query: "", aroundLatLng: cityLatLong, hitsPerPage: 6 })
            .pipe(mergeMap(async ({ hits }: any) => await this.fillVendorWithItsListings(hits)));
    }

    private async handleTopVendorsInLocations() {
        const vendorsInLocations$ = await this.vendorService.getVendorsInPopularLocations();
        this.topVendorsInLocations$ = vendorsInLocations$.pipe(
            flatMap(({ results }) => results),
            mergeMap(async (locationWithVendors: any) => {
                // Fulfill vendors with their listings
                const vendors = await this.fillVendorWithItsListings(locationWithVendors.hits);
                // Here we're turning vendors[] to observable because main-list-vendors expects an observable
                return { location: locationWithVendors.query, vendors: of(vendors) };
            }),
            toArray()
        );
    }

    private async fillVendorWithItsListings(vendors: Array<IVendor>): Promise<Array<IVendor>> {
        // For every vendor, find his item and place into object
        return Promise.all(
            vendors.map(async (vendor: IVendor) => {
                const { hits: listingsOfVendor } = await this.listingService.searchVendorListings("", vendor.objectID, { hitsPerPage: 4 });
                return { ...vendor, listings: listingsOfVendor } as IVendor;
            })
        );
    }

    ngOnDestroy(): void {}
}
