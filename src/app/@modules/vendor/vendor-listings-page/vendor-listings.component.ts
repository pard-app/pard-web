import { Component, OnInit, OnDestroy, ViewChildrenDecorator } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ListingItem } from "src/app/@core/models/listingitem.interface";
import { ListingService } from "@services/listing/listing.service";
import { VendorService } from "@services/vendor/vendor.service";

@Component({
    selector: "app-vendor-listings",
    templateUrl: "./vendor-listings.component.html",
    styleUrls: ["./vendor-listings.component.scss"],
})
export class VendorListingsComponent implements OnInit {
    public _listingsList$ = new BehaviorSubject<Array<ListingItem> | any>([]);
    public _vendor$ = new BehaviorSubject({});
    private vendorId: string;

    constructor(private vendorService: VendorService, private listingService: ListingService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe(async (params) => {
            this.vendorId = params.vendorId;
            this.getVendor();
            const { hits } = await this.requestSearchResults();
            this._listingsList$.next(hits);
        });
    }

    private async requestSearchResults(query = "") {
        return this.listingService.searchVendorListings(query, this.vendorId);
    }

    private async getVendor() {
        const data = await this.vendorService.getVendorById(this.vendorId);
        console.log(data);
        this._vendor$.next(data);
    }

    public async inputTextWritten(query) {
        const { hits } = await this.requestSearchResults(query);
        this._listingsList$.next(hits);
    }
}
