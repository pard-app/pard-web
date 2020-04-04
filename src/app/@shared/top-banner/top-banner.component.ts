import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocationService } from "@core/stores/location/location.service";
@Component({
    selector: "app-top-banner",
    templateUrl: "./top-banner.component.html",
    styleUrls: ["./top-banner.component.scss"],
})
export class TopBannerComponent implements OnInit {
    @Input() displayFormsContainer: boolean = true;

    constructor(private locationService: LocationService, private http: HttpClient) {}

    ngOnInit(): void {}

    get getBackgroundImage() {
        if (this.locationService.currentCity) {
            return `url(assets/images/${this.locationService.currentCity}.jpg)`;
        } else {
            return "none";
        }
    }
}
