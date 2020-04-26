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
    @Output() listingOrVendorClicked = new EventEmitter();
    @Output() onClickSearchVendorOrListingButton = new EventEmitter();
    @Output() onWrite = new EventEmitter();
    @Input() groupedItems$: Observable<SearchVendorOrListingGroup[]>;
    @Input() placeholder: string;
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

    public onPick(ev): void {
        this.listingOrVendorClicked.emit(ev);
    }

    public vendorOrListingSearch(): void {
        const value = this.input.value;
        value && this.onClickSearchVendorOrListingButton.emit(value);
    }

    public clearInput(): void {
        this.onClear.emit();
        this.input.setValue("");
    }
}
