import { Component, OnInit, OnDestroy } from "@angular/core";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";
import { of, Observable } from "rxjs";
import { map, mergeMap, flatMap, concatMap, mergeAll, concatAll, tap, toArray } from "rxjs/operators";
import { IVendor } from "@models/vendor.interface";

@Component({
    selector: "scenario-nothing",
    templateUrl: "./nothing.component.html",
    styleUrls: ["./nothing.component.scss"],
})
export class NothingComponent implements OnInit, OnDestroy {
    public topVendorsInLocations$: Observable<any> = of([]);

    constructor(private vendorService: VendorService, private listingService: ListingService) {}

    async ngOnInit() {
        this.handleTopVendorsInLocations();
    }

    private async handleTopVendorsInLocations() {
        const vendorsInLocation$ = await this.vendorService.getVendorsInPopularLocations();
        this.topVendorsInLocations$ = vendorsInLocation$.pipe(
            flatMap(({ results }) => results),
            mergeMap(async (locationWithVendors: any) => {
                // Fulfill vendors with their listings
                const vendors = await Promise.all(
                    // For every vendor, find his item and place into object
                    locationWithVendors.hits.map(async (vendor: IVendor) => {
                        const { hits: listingsOfVendor } = await this.listingService.searchVendorListings("", vendor.objectID, 0, 4);
                        return { ...vendor, listings: listingsOfVendor };
                    })
                );
                // Here we're turning vendors[] to observable because main-list-vendors expects an observable
                return { location: locationWithVendors.query, vendors: of(vendors) };
            }),
            toArray()
        );
    }
    ngOnDestroy(): void {}
}
