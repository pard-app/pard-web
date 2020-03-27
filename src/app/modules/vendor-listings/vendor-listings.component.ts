import { Component, OnInit, OnDestroy, ViewChildrenDecorator } from "@angular/core";
import { Subscription } from "rxjs";
import { DbServiceService } from "src/app/@features/services/db-service.service";
import { ActivatedRoute } from "@angular/router";
import { IVendor } from "@models/vendor.interface";
import { ListingItem } from "@models/listingitem.interface";

@Component({
    selector: "app-vendor-listings",
    templateUrl: "./vendor-listings.component.html",
    styleUrls: ["./vendor-listings.component.scss"]
})
export class VendorListingsComponent implements OnInit, OnDestroy {
    public listingsList: Array<ListingItem> = [];
    public vendor: IVendor = null;
    private vendorId: string;
    private subscription: Subscription = new Subscription();

    constructor(private dbService: DbServiceService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.vendorId = params.vendorId;
            this.getVendorListings();
            this.getVendor();
        });
    }

    private addToSubscription(item): void {
        this.subscription.add(item);
    }

    private getVendorListings(): void {
        this.addToSubscription(
            this.dbService.getVendorListings(this.vendorId).subscribe(listings => {
                console.log(listings);
                this.listingsList = listings;
            })
        );
    }

    private getVendor(): void {
        this.addToSubscription(
            this.dbService.getVendorById(this.vendorId).subscribe(vendor => {
                console.log(vendor.data());
                this.vendor = vendor.data() as IVendor;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
