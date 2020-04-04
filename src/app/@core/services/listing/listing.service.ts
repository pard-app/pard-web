import { Injectable } from "@angular/core";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { ListingItem } from "src/app/@core/models/listingitem.interface";
import { from, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ListingService {
    constructor(private algoliaService: AlgoliaService) {}

    public searchListing({ query = "", hitsPerPage = 50 } = {}): Observable<ListingItem[] | any> {
        return from(
            this.algoliaService.listingsIndex.search<ListingItem[]>(query, { hitsPerPage })
        );
    }

    public searchVendorListings(query = "", vendorId: string, pagination = {}) {
        return this.algoliaService.listingsIndex.search(query, { filters: "vendor:" + vendorId, ...pagination });
    }

    public searchListingByVendorsIds({ query = "", vendorIds, pagination = {} }) {
        const formatIds = vendorIds.reduce((acc, currVal, idx) => (acc += `vendor:${currVal} ${idx + 1 < vendorIds.length ? "OR " : ""}`), "");
        return from(
            this.algoliaService.listingsIndex.search<ListingItem[]>(query, { filters: formatIds })
        );
    }

    public getListingsByIds(ids: string[]) {
        return this.algoliaService.listingsIndex.getObjects(ids);
    }

    public getListingById(id: string) {
        return this.algoliaService.listingsIndex.getObject(id);
    }
}
