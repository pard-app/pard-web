import { EventEmitter, Component, ViewChild, OnInit, Output } from "@angular/core";
import { Observable, of } from "rxjs";

@Component({
    selector: "app-vendor-listings-search",
    templateUrl: "./vendor-listings-search.component.html",
    styleUrls: ["./vendor-listings-search.component.scss"]
})
export class VendorListingsSearchComponent implements OnInit {
    options: string[];
    filteredOptions$: Observable<string[]>;
    @Output() onChange = new EventEmitter();

    @ViewChild("autoInput") input;

    ngOnInit() {
        this.filteredOptions$ = of(this.options);
    }

    localOnChange() {
        this.onChange.emit(this.input.nativeElement.value);
    }
}
