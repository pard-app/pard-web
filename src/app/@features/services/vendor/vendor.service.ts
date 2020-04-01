import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { IVendor } from "@models/vendor.interface";

@Injectable({
    providedIn: "root"
})
export class VendorService {
    constructor(private algoliaService: AlgoliaService) {}

    public searchVendor(query: string = "", hitsPerPage = 50) {
        return this.algoliaService.vendorsIndex.search(query);
    }

    public getVendorById(id: string) {
        return this.algoliaService.vendorsIndex.getObject(id);
    }

    public getMultipleVendors(ids: any) {
        return this.algoliaService.vendorsIndex.getObjects(ids);
    }
}
