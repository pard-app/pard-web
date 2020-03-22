import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-card-vendor",
    templateUrl: "./card-vendor.component.html",
    styleUrls: ["./card-vendor.component.scss"]
})
export class CardVendorComponent implements OnInit {
    @Input() name: string;
    @Input() description: string;
    @Input() image: string;

    constructor() {}

    ngOnInit(): void {}
}
