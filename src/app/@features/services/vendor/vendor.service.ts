import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AlgoliaService, AlgPromise } from "@services/algolia/algolia.service";
import { IVendor } from "@models/vendor.interface";

@Injectable({
    providedIn: "root"
})
export class VendorService {
    constructor(private algoliaService: AlgoliaService) {}

    public searchVendor(query: string = "", hitsPerPage = 50): AlgPromise<IVendor> {
        return this.algoliaService.vendorsIndex.search({ query, hitsPerPage });
    }
}
