import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ILocation } from "@models/location.interface";

export class SearchRequest {
    location: ILocation | null = null;
    listingOrVendor: string | null = null;
}

@Injectable({
    providedIn: "root",
})
export class MainSearchStore {
    private _searchRequest$ = new BehaviorSubject<SearchRequest>(new SearchRequest());
    public readonly searchRequest$: Observable<SearchRequest> = this._searchRequest$.asObservable();

    public searchChange(srqObj: { location?: ILocation; listingOrVendor?: string }) {
        this._searchRequest$.next({ ...this._searchRequest$.getValue(), ...srqObj });
    }
    // public searchChange(obj) {
    //     console.log({ obj });
    //     console.log("called");
    // }
}
