import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocationStore } from "@core/stores/location/location.store";
@Component({
    selector: "app-top-banner",
    templateUrl: "./top-banner.component.html",
    styleUrls: ["./top-banner.component.scss"],
})
export class TopBannerComponent implements OnInit {
    @Input() displayFormsContainer: boolean = true;

    constructor(private locationStore: LocationStore, private http: HttpClient) {}

    ngOnInit(): void {}

    get getBackgroundImage() {
        if (this.locationStore.currentCity) {
            return `url(assets/images/${this.locationStore.currentCity}.jpg)`;
        } else {
            return "none";
        }
    }
}
