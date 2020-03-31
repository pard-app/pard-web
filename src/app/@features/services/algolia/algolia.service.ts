import { Injectable } from "@angular/core";
import algolia, { SearchClient, SearchIndex } from "algoliasearch";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: "root"
})
export class AlgoliaService {
    public searchClient: SearchClient = algolia(environment.algoliaConfig.appId, environment.algoliaConfig.apiKey);
    public listingsIndex: SearchIndex = this.searchClient.initIndex("listings");
    public vendorsIndex: SearchIndex = this.searchClient.initIndex("vendors");
    constructor() {}
}
