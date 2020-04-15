import { Injectable } from "@angular/core";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { ListingItem } from "src/app/@core/models/listingitem.interface";
import { from, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ListingService {
    constructor(private algoliaService: AlgoliaService) {}

    public searchListing({ query = "", hitsPerPage = 50, page = 0 } = {}): Observable<ListingItem[] | any> {
        return from(
            this.algoliaService.listingsIndex.search<ListingItem[]>(query, { hitsPerPage, page })
        );
    }

    public searchVendorListings(query = "", vendorId: string, pagination = {}) {
        return this.algoliaService.listingsIndex.search(query, { filters: "vendor:" + vendorId, ...pagination });
    }

    public searchListingByVendorIds({ query = "", vendorIds, hitsPerPage = 16, page = 0 }) {
        //vendor:123 OR vendor:234 OR vendor:345...
        const formatIds = vendorIds.reduce((acc, currVal, idx) => (acc += `vendor:${currVal} ${idx + 1 < vendorIds.length ? "OR " : ""}`), "");
        return from(
            this.algoliaService.listingsIndex.search<ListingItem[]>(query, { filters: formatIds, hitsPerPage, page })
        );
    }

    public getListingsByIds(ids: string[]) {
        return this.algoliaService.listingsIndex.getObjects(ids);
    }

    public getListingById(id: string) {
        return this.algoliaService.listingsIndex.getObject(id);
    }
}
