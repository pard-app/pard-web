import { Component, OnInit, OnDestroy, ViewChildrenDecorator } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { DbServiceService } from "@services/db-service/db-service.service";
import { ActivatedRoute } from "@angular/router";
import { IVendor } from "@models/vendor.interface";
import { ListingItem } from "@models/listingitem.interface";
import { map, flatMap } from "rxjs/operators";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";

@Component({
    selector: "app-vendor-listings",
    templateUrl: "./vendor-listings.component.html",
    styleUrls: ["./vendor-listings.component.scss"]
})
export class VendorListingsComponent implements OnInit {
    public _listingsList$ = new BehaviorSubject<Array<ListingItem> | any>([]);
    public vendor$: Observable<IVendor>;
    private vendorId: string;

    constructor(private dbService: DbServiceService, private listingService: ListingService, private route: ActivatedRoute) {}

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

    private getVendor(): void {
        this.vendor$ = this.dbService.getVendorById(this.vendorId) as Observable<IVendor>;
    }
}
