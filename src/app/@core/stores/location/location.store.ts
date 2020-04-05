import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Hit, Suggestion } from "places.js";
@Injectable({
    providedIn: "root",
})
export class LocationStore {
    // private cartItems: Array<ListingItem | any> = [];
    private _currentLocation$ = new BehaviorSubject<Hit | null>(null as Hit);
    private _currentVendorIdsAtLocation$ = new BehaviorSubject<string[]>([]);
    private _currentLocationSuggestion$ = new BehaviorSubject<Suggestion>(null as Suggestion);

    // Expose the observable$ part of the `_currentLocation$` subject (read only stream)
    public readonly currentLocation$: Observable<Hit | null> = this._currentLocation$.asObservable();
    public readonly currentVendorIdsAtLocation$: Observable<string[]> = this._currentVendorIdsAtLocation$.asObservable();
    public readonly currentLocationSuggestion$: Observable<Suggestion> = this._currentLocationSuggestion$.asObservable();

    // CURRENT LOCATION
    public set currentLocation(location) {
        this._currentLocation$.next(location);
    }

    public get currentLocation(): Hit | null {
        return this._currentLocation$.getValue();
    }

    public get currentVendorIdsAtLocation(): string[] {
        return this._currentVendorIdsAtLocation$.getValue();
    }

    public set currentVendorIdsAtLocation(value: string[]) {
        this._currentVendorIdsAtLocation$.next(value);
    }

    public get currentCity() {
        const suggestion = this._currentLocationSuggestion$.getValue();
        if (!suggestion) return;
        return suggestion.name;
    }

    public set currentLocationSuggestion(val: Suggestion) {
        this._currentLocationSuggestion$.next(val);
    }
}
