import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { tap, filter } from "rxjs/operators";
import { QUERY_PARAMS } from "@constants/routing.constants";

@Injectable({
    providedIn: "root",
})
export class ListingStore {
    // private cartItems: Array<ListingItem | any> = [];
    private _currentListingOrVendor$ = new BehaviorSubject<any | null>(null);

    // Expose the observable$ part of the `_currentListingOrVendor$` subject (read only stream)
    public readonly currentListingOrVendor$: Observable<any | null> = this._currentListingOrVendor$.asObservable();

    constructor(private route: ActivatedRoute) {
        this.route.queryParams
            .pipe(
                tap((x) => !x[QUERY_PARAMS.VENDORORLISTING] && (this.currentListingOrVendor = null)),
                filter((x) => x[QUERY_PARAMS.VENDORORLISTING])
            )
            .subscribe(async (x) => {
                this.currentListingOrVendor = x[QUERY_PARAMS.VENDORORLISTING];
            });
    }

    private set currentListingOrVendor(val) {
        this._currentListingOrVendor$.next(val);
    }
}
