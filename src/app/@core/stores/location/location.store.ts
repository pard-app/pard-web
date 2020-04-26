import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Hit, Suggestion } from "places.js";
import { ActivatedRoute } from "@angular/router";
@Injectable({
    providedIn: "root",
})
export class LocationStore {
    // private cartItems: Array<ListingItem | any> = [];
    private _currentLocation$ = new BehaviorSubject<Suggestion | null>(null as Suggestion);
    private _currentVendorIdsAtLocation$ = new BehaviorSubject<string[]>([]);

    // Expose the observable$ part of the `_currentLocation$` subject (read only stream)
    public readonly currentLocation$: Observable<Suggestion | null> = this._currentLocation$.asObservable();
    public readonly currentVendorIdsAtLocation$: Observable<string[]> = this._currentVendorIdsAtLocation$.asObservable();

    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe((x) => {});
    }
    // CURRENT LOCATION
    public get currentLocation(): Suggestion | null {
        return this._currentLocation$.getValue();
    }
    public set currentLocation(val: Suggestion) {
        this._currentLocation$.next(val);
    }

    public get currentVendorIdsAtLocation(): string[] {
        return this._currentVendorIdsAtLocation$.getValue();
    }

    public set currentVendorIdsAtLocation(value: string[]) {
        this._currentVendorIdsAtLocation$.next(value);
    }

    public get currentCity() {
        const suggestion = this._currentLocation$.getValue();
        if (!suggestion) return;
        return suggestion.name;
    }
}
