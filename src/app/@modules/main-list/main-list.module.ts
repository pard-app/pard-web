import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MainListComponent } from "./main-list.component";
import { VendorModule } from "@modules/vendor/vendor.module";
import { SharedModule } from "@shared/shared.module";
import { NbTabsetModule, NbSpinnerModule, NbCardModule } from "@nebular/theme";
import { SearchBoxModule } from "./search-box/search-box.module";
import { MainListListingsModule } from "./main-list-listings/main-list-listings.module";
import { MainListVendorsModule } from "./main-list-vendors/main-list-vendors.module";
import { NothingComponent } from './scenarios/nothing/nothing.component';
import { OnlyLocationComponent } from './scenarios/only-location/only-location.component';
import { OnlyListingComponent } from './scenarios/only-listing/only-listing.component';
import { LocationAndListingComponent } from './scenarios/location-and-listing/location-and-listing.component';

@NgModule({
    declarations: [MainListComponent, NothingComponent, OnlyLocationComponent, OnlyListingComponent, LocationAndListingComponent],
    imports: [
        CommonModule,
        TranslateModule,
        VendorModule,
        SharedModule,
        NbTabsetModule,
        NbCardModule,
        SearchBoxModule,
        MainListListingsModule,
        MainListVendorsModule,
    ],
    exports: [MainListComponent],
})
export class MainListModule {}
