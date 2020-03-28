import { Component, OnInit, OnDestroy, ViewChildrenDecorator } from "@angular/core";
import { Subscription, Observable, of } from "rxjs";
import { DbServiceService } from "src/app/@features/services/db-service.service";
import { ActivatedRoute } from "@angular/router";
import { IVendor } from "@models/vendor.interface";
import { ListingItem } from "@models/listingitem.interface";
import { map, flatMap } from "rxjs/operators";

@Component({
    selector: "app-vendor-listings",
    templateUrl: "./vendor-listings.component.html",
    styleUrls: ["./vendor-listings.component.scss"]
})
export class VendorListingsComponent implements OnInit {
    public listingsList$: Observable<Array<ListingItem>>;
    public vendor$: Observable<IVendor>;
    private vendorId: string;

    constructor(private dbService: DbServiceService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.vendorId = params.vendorId;
            this.getVendorListings();
            this.getVendor();
        });
        this.listingsList$.subscribe(x => console.log(x));
    }

    private getVendorListings(): void {
        this.listingsList$ = this.dbService.getVendorListings(this.vendorId);
    }

    private getVendor(): void {
        this.vendor$ = this.dbService.getVendorById(this.vendorId) as Observable<IVendor>;
    }
}
