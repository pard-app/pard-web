import { Injectable } from "@angular/core";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { IVendor } from "src/app/@core/models/vendor.interface";
import { Observable, from, of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class VendorService {
    private get aroundRadiusMeters(): number {
        return 50000; /* 50km radius */
    }

    constructor(private algoliaService: AlgoliaService) {}

    public searchVendor({ query = "", hitsPerPage = 6, page = 0, aroundLatLng = "" } = {}): Observable<IVendor | any> {
        const lat_lng_opts = aroundLatLng ? { aroundLatLng, aroundRadius: this.aroundRadiusMeters } : null;
        return from(
            this.algoliaService.vendorsIndex.search<IVendor>(query, { hitsPerPage, page, ...lat_lng_opts })
        );
    }

    public getVendorById(id: string) {
        return this.algoliaService.vendorsIndex.getObject(id);
    }

    public getMultipleVendors(ids: string[]) {
        return this.algoliaService.vendorsIndex.getObjects(ids);
    }

    public async getVendorsInPopularLocations(sortBy = null) {
        const { facets } = await this.algoliaService.vendorsIndex.search("", {
            facets: ["city"],
            hitsPerPage: 0,
        });

        //const topCities = facets.city.sort()

        //console.log(facets);

        // return facets;

        // console.log(facets);

        const citiesToQuery = Object.keys(facets.city).slice(0, 3);

        //console.log(citiesToQuery);

        const queries = citiesToQuery.map((cityName) => ({
            indexName: "vendors",
            query: cityName,
            hitsPerPage: 3,
            restrictSearchableAttributes: ["city", "address"],
        }));

        const { results } = await this.algoliaService.searchClient.multipleQueries(queries);

        return of(results);
    }
}
