import { Injectable } from "@angular/core";
import * as algolia from "algoliasearch";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: "root"
})
export class AlgoliaService {
    public searchClient: algolia.Client = algolia(environment.algoliaConfig.appId, environment.algoliaConfig.apiKey);
    public listingsIndex: algolia.Index = this.searchClient.initIndex("listings");
    public vendorsIndex: algolia.Index = this.searchClient.initIndex("vendors");
    constructor() {}
}

export type AlgPromise<T> = Promise<algolia.Response<T>>;
