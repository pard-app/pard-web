import { Component, OnInit, OnDestroy, ViewChildrenDecorator } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ListingItem } from "@models/listingitem.interface";
import { ListingService } from "@services/listing/listing.service";
import { VendorService } from "@services/vendor/vendor.service";

@Component({
    selector: "app-vendor-listings",
    templateUrl: "./vendor-listings.component.html",
    styleUrls: ["./vendor-listings.component.scss"]
})
export class VendorListingsComponent implements OnInit {
    public _listingsList$ = new BehaviorSubject<Array<ListingItem> | any>([]);
    public _vendor$ = new BehaviorSubject({});
    private vendorId: string;

    constructor(private vendorService: VendorService, private listingService: ListingService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.vendorId = params.vendorId;
            this.getVendorListings();
            this.getVendor();
        });
    }

    private async getVendorListings() {
        const data = await this.listingService.getVendorListings(this.vendorId);
        this._listingsList$.next(data.hits);
    }

    private async getVendor() {
        const data = await this.vendorService.getVendorById(this.vendorId);
        console.log(data);
        this._vendor$.next(data);
    }
}
