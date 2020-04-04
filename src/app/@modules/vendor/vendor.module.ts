import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VendorRoutingModule } from "./vendor-routing.module";
import { TranslateModule } from "@ngx-translate/core";
import { VendorListingsComponent } from "./vendor-listings-page/vendor-listings.component";
import { VendorSingleListingViewComponent } from "./vendor-single-listing-page/vendor-single-listing-view.component";
import { VendorSummaryHeaderComponent } from "./vendor-summary-header/vendor-summary-header.component";
import { SharedModule } from "@shared/shared.module";
import { NbCardModule, NbSpinnerModule } from "@nebular/theme";
import { VendorListingsSearchComponent } from "./vendor-listings-page/vendor-listings-search/vendor-listings-search.component";

@NgModule({
    declarations: [VendorListingsComponent, VendorSingleListingViewComponent, VendorSummaryHeaderComponent, VendorListingsSearchComponent],
    imports: [CommonModule, SharedModule, VendorRoutingModule, TranslateModule, NbCardModule, NbSpinnerModule],
    exports: [VendorListingsComponent],
})
export class VendorModule {}
