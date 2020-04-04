import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Hit } from "places.js";
@Injectable({
    providedIn: "root",
})
export class LocationService {
    // private cartItems: Array<ListingItem | any> = [];
    private _currentLocation$ = new BehaviorSubject<Hit>({} as Hit);
    private _currentVendorIdsAtLocation$ = new BehaviorSubject<string[]>([]);

    // Expose the observable$ part of the `_currentLocation$` subject (read only stream)
    public readonly currentLocation$: Observable<Hit> = this._currentLocation$.asObservable();
    public readonly currentVendorIdsAtLocation$: Observable<string[]> = this._currentVendorIdsAtLocation$.asObservable();
    public currentCity;

    public set currentLocation(location) {
        this._currentLocation$.next(location);
    }

    public get currentLocation(): Hit {
        return this._currentLocation$.getValue();
    }

    public get currentVendorIdsAtLocation(): string[] {
        return this._currentVendorIdsAtLocation$.getValue();
    }

    public set currentVendorIdsAtLocation(value: string[]) {
        this._currentVendorIdsAtLocation$.next(value);
    }
}
