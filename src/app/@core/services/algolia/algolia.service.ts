import { Injectable } from "@angular/core";
import algolia, { SearchClient, SearchIndex } from "algoliasearch";
import { environment } from "src/environments/environment";
import { Observable, from } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AlgoliaService {
    public searchClient: SearchClient = algolia(environment.algoliaConfig.appId, environment.algoliaConfig.apiKey);
    public listingsIndex: SearchIndex = this.searchClient.initIndex("listings");
    public vendorsIndex: SearchIndex = this.searchClient.initIndex("vendors");

    constructor() {}

    public searchVendorsAndListings(query: string, options = {}): Observable<any> {
        const settings = [
            { indexName: "listings", restrictSearchableAttributes: ["title", "description"] },
            { indexName: "vendors", restrictSearchableAttributes: ["company", "description"] },
        ];

        const queries = settings.map(({ indexName, restrictSearchableAttributes }) => ({
            indexName: indexName,
            restrictSearchableAttributes: restrictSearchableAttributes,
            query,
            hitsPerPage: 6,
            ...options,
        }));

        return from(this.searchClient.multipleQueries(queries));
    }
}
