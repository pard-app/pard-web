import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { AlgoliaService } from "@services/algolia/algolia.service";

@Injectable({
    providedIn: "root",
})
export class ConfigurationResolver implements Resolve<any> {
    constructor(private algoliaService: AlgoliaService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.algoliaService.getConfiguration();
    }
}
