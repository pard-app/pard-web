import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { LocationStore } from "@core/stores/location/location.store";
import { SearchRequest } from "./search-box/search-box.component";

@Component({
    selector: "app-main-list",
    templateUrl: "./main-list.component.html",
    styleUrls: ["./main-list.component.scss"],
})
export class MainListComponent implements OnInit, OnDestroy {
    private _searchRequest$ = new BehaviorSubject<SearchRequest>(new SearchRequest());
    public readonly searchRequest$: Observable<SearchRequest> = this._searchRequest$.asObservable();
    @ViewChild("container", { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(public locationStore: LocationStore) {}

    ngOnInit() {}

    searchOnChange(srqObj: SearchRequest) {
        this._searchRequest$.next(srqObj);
    }

    ngOnDestroy() {}
}
