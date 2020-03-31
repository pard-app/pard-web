import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AlgoliaService, AlgPromise } from "@services/algolia/algolia.service";
import { ListingItem } from "@models/listingitem.interface";

@Injectable({
    providedIn: "root"
})
export class ListingService {
    constructor(private algoliaService: AlgoliaService) {}

    public searchListing(query: string = "", hitsPerPage = 50): AlgPromise<ListingItem> {
        return this.algoliaService.listingsIndex.search({ query, hitsPerPage });
    }
}
