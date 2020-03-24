import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-topheader",
    templateUrl: "./topheader.component.html",
    styleUrls: ["./topheader.component.scss"]
})
export class TopheaderComponent implements OnInit {
    public items = [{ title: "About", url: "https://pard.lt/" }, { title: "Log out" }];
    public number = 3;
    constructor() {}

    ngOnInit(): void {}
}
