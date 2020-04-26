import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { ILocation } from "@models/location.interface";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { mapHitToLocation } from "@core/mappers/location.mappers";
import { filter, tap } from "rxjs/operators";
import { QUERY_PARAMS } from "@constants/routing.constants";
@Injectable({
    providedIn: "root",
})
export class LocationStore {
    // private cartItems: Array<ListingItem | any> = [];
    private _currentLocation$ = new BehaviorSubject<ILocation | null>(null as ILocation);
    private _currentVendorIdsAtLocation$ = new BehaviorSubject<string[]>([]);

    // Expose the observable$ part of the `_currentLocation$` subject (read only stream)
    public readonly currentLocation$: Observable<ILocation | null> = this._currentLocation$.asObservable();
    public readonly currentVendorIdsAtLocation$: Observable<string[]> = this._currentVendorIdsAtLocation$.asObservable();

    constructor(private route: ActivatedRoute, private algolia: AlgoliaService) {
        this.route.queryParams
            .pipe(
                tap((x) => !x[QUERY_PARAMS.LOCATION] && (this.currentLocation = null)),
                filter((x) => x[QUERY_PARAMS.LOCATION])
            )
            .subscribe(async (x) => {
                const data = await this.algolia.placeById(x[QUERY_PARAMS.LOCATION]);
                this.currentLocation = mapHitToLocation(data);
            });
    }

    private set currentLocation(val: ILocation) {
        this._currentLocation$.next(val);
    }

    public get currentVendorIdsAtLocation(): string[] {
        return this._currentVendorIdsAtLocation$.getValue();
    }

    public set currentVendorIdsAtLocation(value: string[]) {
        this._currentVendorIdsAtLocation$.next(value);
    }
}
