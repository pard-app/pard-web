import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Hit } from "places.js";
@Injectable({
    providedIn: "root",
})
export class LocationService {
    // private cartItems: Array<ListingItem | any> = [];
    private _curretLocation$ = new BehaviorSubject<Hit>({} as Hit);

    // Expose the observable$ part of the `_curretLocation$` subject (read only stream)
    public readonly curretLocation$: Observable<Hit> = this._curretLocation$.asObservable();

    public set currentLocation(location) {
        this._curretLocation$.next(location);
    }

    public get currentLocation(): Hit {
        return this._curretLocation$.getValue();
    }
}
