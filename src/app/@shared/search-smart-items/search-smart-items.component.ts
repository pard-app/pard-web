import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from "@angular/core";
import { Observable, of } from "rxjs";
export interface Group {
    name: string;
    children: string[];
}

@Component({
    selector: "app-search-smart-items",
    templateUrl: "./search-smart-items.component.html",
    styleUrls: ["./search-smart-items.component.scss"],
})
export class SearchSmartItemsComponent {
    @Output() onClear = new EventEmitter();
    @Output() listingOrVendorChanged = new EventEmitter();
    @Input() groupedItems$: Observable<Group[]>;
    @ViewChild("theInput") input: ElementRef;

    public currVal: string = null;

    constructor() {}

    public onCurrentValueChange() {
        !this.currVal && this.clearInput();
    }

    public onPick(ev) {
        this.listingOrVendorChanged.emit(ev);
    }

    public clearInputButtonOnClick() {
        this.currVal = null;
    }

    public clearInput() {
        this.input.nativeElement.value = null;
        this.currVal = null;
        this.onClear.emit();
    }
}
