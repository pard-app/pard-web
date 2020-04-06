import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { LocationStore } from "@core/stores/location/location.store";
@Component({
    selector: "app-main-list",
    templateUrl: "./main-list.component.html",
    styleUrls: ["./main-list.component.scss"],
})
export class MainListComponent implements OnInit, OnDestroy {
    public currentActiveTab$: Observable<Params>;

    constructor(public locationStore: LocationStore, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.currentActiveTab$ = this.route.queryParams.pipe(
            map((params) => {
                if (!params.view) return { view: "vendors" };
                return params;
            })
        );
    }

    public changeTab({ tabId }) {
        this.router.navigate([], { queryParams: { view: tabId } });
    }

    ngOnDestroy() {}
}
