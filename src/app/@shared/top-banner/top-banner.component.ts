import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { LocationStore } from "@core/stores/location/location.store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Component({
    selector: "app-top-banner",
    templateUrl: "./top-banner.component.html",
    styleUrls: ["./top-banner.component.scss"],
})
export class TopBannerComponent implements OnInit {
    @Input() displayFormsContainer: boolean = true;
    public imageUrl$: Observable<string>;
    public showFindLocationIcon: boolean;

    constructor(private locationStore: LocationStore, private http: HttpClient) {}

    ngOnInit(): void {
        this.imageUrl$ = this.locationStore.currentLocation$.pipe(
            map((location) => {
                if (location) {
                    this.showFindLocationIcon = false;
                } else {
                    this.showFindLocationIcon = true;
                }
                const img = `assets/images/${this.locationStore.currentCity}.jpg`;
                if (img.includes("undefined")) return;
                return img;
            })
        );
    }
}
