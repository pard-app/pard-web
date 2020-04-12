import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ListingService {
    // private cartItems: Array<ListingItem | any> = [];
    private _currentListingOrVendor$ = new BehaviorSubject<any | null>(null);

    // Expose the observable$ part of the `_currentListingOrVendor$` subject (read only stream)
    public readonly currentListingOrVendor$: Observable<any | null> = this._currentListingOrVendor$.asObservable();
    constructor() {}

    public set currentListingOrVendor(val) {
        this._currentListingOrVendor$.next(val);
    }
}
