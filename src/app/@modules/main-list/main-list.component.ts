import { Component, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Observable } from "rxjs";
import { MainSearchStore, SearchRequest } from "@core/stores/mainsearch/mainsearch.store";

@Component({
    selector: "app-main-list",
    templateUrl: "./main-list.component.html",
    styleUrls: ["./main-list.component.scss"],
})
export class MainListComponent implements OnDestroy {
    public searchRequest$: Observable<SearchRequest>;

    constructor(private changeDetector: ChangeDetectorRef, private mainSearchStore: MainSearchStore) {
        this.searchRequest$ = mainSearchStore.searchRequest$;
    }

    ngAfterViewChecked() {
        this.changeDetector.detectChanges();
    }

    ngOnDestroy() {}
}
