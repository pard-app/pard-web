import { Injectable } from "@angular/core";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { IVendor } from "src/app/@core/models/vendor.interface";
import { Observable, from } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class VendorService {
    private get aroundRadiusMeters(): number {
        return 40000; /* 40km radius */
    }

    constructor(private algoliaService: AlgoliaService) {}

    public searchVendor({ query = "", hitsPerPage = 50, aroundLatLng = "" } = {}): Observable<IVendor | any> {
        const lat_lng_opts = aroundLatLng ? { aroundLatLng, aroundRadius: this.aroundRadiusMeters } : null;
        return from(this.algoliaService.vendorsIndex.search<IVendor>(query, lat_lng_opts));
    }

    public getVendorById(id: string) {
        return this.algoliaService.vendorsIndex.getObject(id);
    }

    public getMultipleVendors(ids: string[]) {
        return this.algoliaService.vendorsIndex.getObjects(ids);
    }
}