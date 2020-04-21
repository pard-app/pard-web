import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-privacy-policy",
    templateUrl: "./privacy-policy.component.html",
    styleUrls: ["./privacy-policy.component.scss"],
})
export class PrivacyPolicyComponent implements OnInit {
    constructor(translate: TranslateService) {}

    ngOnInit(): void {}
}
