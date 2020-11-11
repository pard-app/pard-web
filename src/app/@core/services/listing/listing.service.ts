import { Injectable } from "@angular/core";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { ListingItem } from "src/app/@core/models/listingitem.interface";
import { from, Observable } from "rxjs";
import { IVendor } from "@models/vendor.interface";

@Injectable({
    providedIn: "root",
})
export class ListingService {
    private readonly aroundRadiusMeters = 40000; /* 40km radius */

    constructor(private algoliaService: AlgoliaService) {}

    public searchListing({ query = "", hitsPerPage = 50, page = 0, aroundLatLng = "" } = {}): Observable<ListingItem[] | any> {
        const lat_lng_opts = aroundLatLng ? { aroundLatLng, aroundRadius: this.aroundRadiusMeters } : null;
        return from(
            this.algoliaService.listingsIndex.search<ListingItem[]>(query, { hitsPerPage, page, ...lat_lng_opts })
        );
    }

    public getNewestListings(query = "", hitsPerPage = 6, page = 0) {
        return this.algoliaService.listingsIndex.search(query, { hitsPerPage, page });
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

    public async fillVendorWithItsListings(vendors: Array<IVendor>): Promise<Array<IVendor>> {
        // For every vendor, find their listings and place into object
        return Promise.all(
            vendors.map(async (vendor: IVendor) => {
                const { hits: listingsOfVendor } = await this.searchVendorListings("", vendor.objectID, { hitsPerPage: 4 });
                return { ...vendor, listings: listingsOfVendor } as IVendor;
            })
        );
    }
}
