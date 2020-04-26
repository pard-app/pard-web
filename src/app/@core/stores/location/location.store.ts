import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Hit, Suggestion } from "places.js";
import { ActivatedRoute } from "@angular/router";
import { ILocation } from "@models/location.interface";
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

    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe((x) => {});
    }
    // CURRENT LOCATION
    public get currentLocation(): ILocation | null {
        return this._currentLocation$.getValue();
    }
    public set currentLocation(val: ILocation) {
        this._currentLocation$.next(val);
    }

    public get currentVendorIdsAtLocation(): string[] {
        return this._currentVendorIdsAtLocation$.getValue();
    }

    public set currentVendorIdsAtLocation(value: string[]) {
        this._currentVendorIdsAtLocation$.next(value);
    }

    public get currentCity() {
        const location = this._currentLocation$.getValue();
        if (!location) return;
        return location.name;
    }
}
