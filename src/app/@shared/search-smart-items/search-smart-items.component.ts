import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, OnDestroy } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { SearchVendorOrListingGroup } from "@models/vendorAndListing.interface";

@Component({
    selector: "app-search-smart-items",
    templateUrl: "./search-smart-items.component.html",
    styleUrls: ["./search-smart-items.component.scss"],
})
export class SearchSmartItemsComponent implements OnInit, OnDestroy {
    @Output() onClear = new EventEmitter();
    @Output() listingOrVendorChanged = new EventEmitter();
    @Output() onWrite = new EventEmitter();
    @Input() groupedItems$: Observable<SearchVendorOrListingGroup[]>;
    public input: FormControl = new FormControl();
    private sub = new Subscription();

    constructor() {}

    ngOnInit(): void {
        this.sub = this.input.valueChanges.subscribe((str) => {
            !str && this.onClear.emit();
            this.onWrite.emit(str);
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public onPick(ev) {
        this.listingOrVendorChanged.emit(ev);
    }

    public clearInput() {
        this.onClear.emit();
        this.input.setValue(null);
    }
}
