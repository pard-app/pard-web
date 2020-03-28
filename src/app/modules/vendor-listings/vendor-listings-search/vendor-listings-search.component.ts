import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-vendor-listings-search",
    templateUrl: "./vendor-listings-search.component.html",
    styleUrls: ["./vendor-listings-search.component.scss"]
})
export class VendorListingsSearchComponent implements OnInit {
    options: string[];
    filteredOptions$: Observable<string[]>;

    @ViewChild("autoInput") input;

    ngOnInit() {
        this.options = ["Option 1", "Option 2", "Option 3"];
        this.filteredOptions$ = of(this.options);
    }

    private filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    }

    getFilteredOptions(value: string): Observable<string[]> {
        return of(value).pipe(map(filterString => this.filter(filterString)));
    }

    onChange() {
        this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
    }

    onSelectionChange($event) {
        this.filteredOptions$ = this.getFilteredOptions($event);
    }
}