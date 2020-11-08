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
    public configurationsIndex: SearchIndex = this.searchClient.initIndex("configurations");

    public places = this.placesInit();
    public placeById = this.placesInit("getById");

    public configuration: any;

    constructor() {}

    public getConfiguration() {
        console.log("get configuration called");
        if (this.configuration) {
            console.log("returned cache");
            return this.configuration;
        } else {
            console.log("loading data");

            let host = environment.hosts.find((supportedHosts) => supportedHosts == window.location.hostname);

            if (!host) {
                host == "localhost";
            }

            return this.configurationsIndex.getObject(host).then((configuration) => {
                this.configuration = configuration;
                console.log(this.configuration);
                return this.configuration;
            });
        }
    }

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
        // https://community.algolia.com/places/api-clients.html#rest-api
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
                        ...requestOptions,
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
                        ...requestOptions,
                    }
                );
        };
    }
}
