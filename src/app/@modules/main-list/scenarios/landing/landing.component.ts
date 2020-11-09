import { Component, OnInit, OnDestroy } from "@angular/core";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";
import { of, Observable } from "rxjs";
import { mergeMap, flatMap, toArray, concatMap } from "rxjs/operators";
import { ROUTING_CONSTANTS, locationQueryParams, QUERY_PARAMS } from "@constants/routing.constants";
import { Router } from "@angular/router";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { DbService } from "@services/db-service/db-service.service";
import { IVendor } from "@models/vendor.interface";

@Component({
    selector: "scenario-landing",
    templateUrl: "./landing.component.html",
    styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit, OnDestroy {
    public topVendorsInLocations$: Observable<any> = of([{}]);
    public isLoadingVendorsInLocations: boolean = true;
    public globalRoutes = ROUTING_CONSTANTS;
    public mainPromotedVendor: any;

    constructor(private vendorService: VendorService, private listingService: ListingService, private router: Router, public algolia: AlgoliaService) {}

    async ngOnInit() {
        //this.handleTopVendorsInLocations();
        this.getPromotedVendors();
    }

    private async getPromotedVendors() {
        if (this.algolia.configuration.main_promotion && this.algolia.configuration.main_promotion.active) {
            this.vendorService.getVendorById(this.algolia.configuration.main_promotion.vendor).then((vendor) => {
                this.listingService.getListingsByIds(this.algolia.configuration.main_promotion.listings).then((listings) => {
                    this.mainPromotedVendor = vendor;
                    this.mainPromotedVendor.listings = listings.results;
                    //this.mainPromotedVendor.config = this.algolia.configuration.vendors.find((vendors) => vendors.vendor == this.mainPromotedVendor.objectID);
                });
            });
        }
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
