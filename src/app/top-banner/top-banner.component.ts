import { Component, OnInit, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-top-banner",
    templateUrl: "./top-banner.component.html",
    styleUrls: ["./top-banner.component.scss"]
})
export class TopBannerComponent implements OnInit {
    @Output() public currentCity: string;

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {}

    changeCity(ev) {
        this.currentCity = ev;
        // console.log(ev);
    }

    get getBackgroundImage() {
        if (this.currentCity) {
            return `url(assets/images/${this.currentCity}.jpg)`;
        } else {
            return "black";
        }
    }
}
