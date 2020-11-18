import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { locationQueryParams, QUERY_PARAMS, ROUTING_CONSTANTS } from "@constants/routing.constants";
import { AlgoliaService } from "@services/algolia/algolia.service";

@Component({
    selector: "app-card-city",
    templateUrl: "./card-city.component.html",
    styleUrls: ["./card-city.component.scss"],
})
export class CardCityComponent implements OnInit {
    constructor(public algoliaService: AlgoliaService, private router: Router) {}

    ngOnInit(): void {}

    public async routeToLocation(locationName: string) {
        const { hits } = await this.algoliaService.places(locationName);
        if (!hits.length) return;
        const firstHitId = hits[0].objectID;
        if (firstHitId) this.router.navigate([ROUTING_CONSTANTS.ROOT], locationQueryParams({ [QUERY_PARAMS.LOCATION]: firstHitId }));
    }
}
