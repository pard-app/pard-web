import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class ListingStore {
    // private cartItems: Array<ListingItem | any> = [];
    private _currentListingOrVendor$ = new BehaviorSubject<any | null>(null);

    // Expose the observable$ part of the `_currentListingOrVendor$` subject (read only stream)
    public readonly currentListingOrVendor$: Observable<any | null> = this._currentListingOrVendor$.asObservable();

    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe(async (x) => {
            console.log(x);
        });
    }

    private set currentListingOrVendor(val) {
        this._currentListingOrVendor$.next(val);
    }
}
