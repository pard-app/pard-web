import { Component, OnInit, OnDestroy } from "@angular/core";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";
import { of, Observable } from "rxjs";
import { mergeMap, flatMap, toArray, concatMap } from "rxjs/operators";
import { ROUTING_CONSTANTS, locationQueryParams, QUERY_PARAMS } from "@constants/routing.constants";
import { Router } from "@angular/router";
import { AlgoliaService } from "@services/algolia/algolia.service";

@Component({
    selector: "scenario-nothing",
    templateUrl: "./nothing.component.html",
    styleUrls: ["./nothing.component.scss"],
})
export class NothingComponent implements OnInit, OnDestroy {
    public topVendorsInLocations$: Observable<any> = of([{}]);
    public isLoadingVendorsInLocations: boolean = true;
    public globalRoutes = ROUTING_CONSTANTS;

    constructor(private vendorService: VendorService, private listingService: ListingService, private router: Router, private algolia: AlgoliaService) {}

    async ngOnInit() {
        this.handleTopVendorsInLocations();
    }

    private async handleTopVendorsInLocations() {
        this.isLoadingVendorsInLocations = true;
        const vendorsInLocations$ = await this.vendorService.getVendorsInPopularLocations();
        this.topVendorsInLocations$ = vendorsInLocations$.pipe(
            flatMap((results) => results),
            concatMap(async (locationWithVendors: any) => {
                // Fulfill vendors with their listings
                const vendors = await this.listingService.fillVendorWithItsListings(locationWithVendors.hits);
                this.isLoadingVendorsInLocations = false;
                // Here we're turning vendors[] to observable because main-list-vendors expects an observable
                return { location: locationWithVendors.query, vendors: of(vendors) };
            }),
            toArray()
        );
    }

    public async routeToLocation(locationName: string) {
        const { hits } = await this.algolia.places(locationName);
        if (!hits.length) return;
        const firstHitId = hits[0].objectID;
        if (firstHitId) this.router.navigate([ROUTING_CONSTANTS.ROOT], locationQueryParams({ [QUERY_PARAMS.LOCATION]: firstHitId }));
    }

    ngOnDestroy(): void {}
}
