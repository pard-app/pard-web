import { Component, OnInit, OnDestroy } from "@angular/core";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";
import { of, Observable } from "rxjs";
import { mergeMap, flatMap, toArray, catchError } from "rxjs/operators";
import { IVendor } from "@models/vendor.interface";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "scenario-nothing",
    templateUrl: "./nothing.component.html",
    styleUrls: ["./nothing.component.scss"],
})
export class NothingComponent implements OnInit, OnDestroy {
    public topVendorsInLocations$: Observable<any> = of([{}]);
    public isLoading: boolean = true;

    constructor(private vendorService: VendorService, private listingService: ListingService, private http: HttpClient) {}

    async ngOnInit() {
        this.handleTopVendorsInLocations();
    }

    private async handleTopVendorsInLocations() {
        this.isLoading = true;
        const vendorsInLocations$ = await this.vendorService.getVendorsInPopularLocations();
        this.topVendorsInLocations$ = vendorsInLocations$.pipe(
            flatMap(({ results }) => results),
            mergeMap(async (locationWithVendors: any) => {
                // Fulfill vendors with their listings
                const vendors = await this.listingService.fillVendorWithItsListings(locationWithVendors.hits);
                this.isLoading = false;
                // Here we're turning vendors[] to observable because main-list-vendors expects an observable
                return { location: locationWithVendors.query, vendors: of(vendors) };
            }),
            toArray()
        );
    }

    ngOnDestroy(): void {}
}
