import { Injectable } from "@angular/core";
import algolia, { SearchClient, SearchIndex } from "algoliasearch";
import { shuffle } from "@algolia/client-common";
import { environment } from "src/environments/environment";
import { Observable, from } from "rxjs";
import { Suggestion, RawAnswer } from "places.js";

@Injectable({
    providedIn: "root",
})
export class AlgoliaService {
    public searchClient: SearchClient = algolia(environment.algoliaConfig.appId, environment.algoliaConfig.apiKey);
    public listingsIndex: SearchIndex = this.searchClient.initIndex("listings");
    public vendorsIndex: SearchIndex = this.searchClient.initIndex("vendors");
    public places = this.placesInit();
    public placeById = this.placesInit("getById");

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

    private placesInit(type: string = "search"): (query: string, requestOptions?: {}) => Readonly<Promise<RawAnswer>> {
        const placesClient = algolia(environment.placesConfig.appId, environment.placesConfig.apiKey, {
            hosts: [{ url: "places-dsn.algolia.net" }].concat(
                shuffle([{ url: "places-1.algolia.net" }, { url: "places-2.algolia.net" }, { url: "places-3.algolia.net" }])
            ),
        });
        return (query, requestOptions) => {
            if (type === "search")
                return placesClient.transporter.read(
                    {
                        method: "POST",
                        path: "1/places/query",
                        data: {
                            query,
                        },
                        cacheable: true,
                    },
                    {
                        type: "city",
                        countries: ["lt"],
                        hitsPerPage: 6,
                    }
                );
            if (type === "getById")
                return placesClient.transporter.read(
                    {
                        method: "GET",
                        path: `1/places/${query}`,
                        cacheable: true,
                    },
                    {
                        type: "city",
                        countries: ["lt"],
                    }
                );
        };
    }
}
