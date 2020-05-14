import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-button-load-more",
    templateUrl: "./button-load-more.component.html",
    styleUrls: ["./button-load-more.component.scss"],
})
export class ButtonLoadMoreComponent {
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    constructor() {}
}
