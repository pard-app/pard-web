import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { ListingItem } from "@models/listingitem.interface";
import { from } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ListingService {
    constructor(private algoliaService: AlgoliaService) {}

    public searchListing(query: string = "", hitsPerPage = 50) {
        return this.algoliaService.listingsIndex.search(query, { hitsPerPage });
    }

    public searchVendorListings(query = "", vendorId: string, pagination = {}) {
        return this.algoliaService.listingsIndex.search(query, { filters: "vendor:" + vendorId, ...pagination });
    }

    public getListingsByIds(ids: string[]) {
        return this.algoliaService.listingsIndex.getObjects(ids);
    }

    public getListingById(id: string) {
        return this.algoliaService.listingsIndex.getObject(id);
    }
}
