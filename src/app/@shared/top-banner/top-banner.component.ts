import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
    selector: "app-top-banner",
    templateUrl: "./top-banner.component.html",
    styleUrls: ["./top-banner.component.scss"],
})
export class TopBannerComponent implements OnInit {
    @Input() displayFormsContainer: boolean = true;

    public currentCity;

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {}

    get getBackgroundImage() {
        if (this.currentCity) {
            return `url(assets/images/${this.currentCity}.jpg)`;
        } else {
            return "rgb(238, 243, 255)";
        }
    }
}
