import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { VendorListingsComponent } from "./vendor-listings-page/vendor-listings.component";
import { VendorSingleListingViewComponent } from "./vendor-single-listing-page/vendor-single-listing-view.component";

export const VENDOR_ROUTES: Routes = [
    { path: ":vendorId", component: VendorListingsComponent },
    { path: ":vendorId/:listingId", component: VendorSingleListingViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(VENDOR_ROUTES)],
    exports: [RouterModule]
})
export class VendorRoutingModule {}
