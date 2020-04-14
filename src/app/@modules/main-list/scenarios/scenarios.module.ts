import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationAndListingComponent } from "./location-and-listing/location-and-listing.component";
import { NothingComponent } from "./nothing/nothing.component";
import { OnlyListingComponent } from "./only-listing/only-listing.component";
import { OnlyLocationComponent } from "./only-location/only-location.component";
import { MainListVendorsModule } from "../main-list-vendors/main-list-vendors.module";
import { MainListListingsModule } from "../main-list-listings/main-list-listings.module";

@NgModule({
    declarations: [LocationAndListingComponent, NothingComponent, OnlyListingComponent, OnlyLocationComponent],
    imports: [CommonModule, MainListListingsModule, MainListVendorsModule],
    exports: [LocationAndListingComponent, NothingComponent, OnlyListingComponent, OnlyLocationComponent],
})
export class ScenariosModule {}
