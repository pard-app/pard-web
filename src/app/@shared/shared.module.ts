import { NgModule } from "@angular/core";

// NEBULAR MODULES
import {
    NbAutocompleteModule,
    NbCardModule,
    NbAutocompleteDirective,
    NbInputModule,
    NbButtonModule,
    NbMenuService,
    NbIconModule,
    NbSelectModule,
    NbBadgeModule,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { CardVendorComponent } from "./card-vendor/card-vendor.component";
import { InputValidateWrapperComponent } from "./input-validate-wrapper/input-validate-wrapper.component";
import { ListListingsComponent } from "./list-listings/list-listings.component";
import { SearchLocationComponent } from "./search-location/search-location.component";
import { SearchSmartItemsComponent } from "./search-smart-items/search-smart-items.component";
import { TopBannerComponent } from "./top-banner/top-banner.component";
import { CardListingComponent } from "./card-listing/card-listing.component";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        CardListingComponent,
        CardVendorComponent,
        InputValidateWrapperComponent,
        ListListingsComponent,
        SearchLocationComponent,
        SearchSmartItemsComponent,
        TopBannerComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        NbEvaIconsModule,
        NbAutocompleteModule,
        NbCardModule,
        NbInputModule,
        NbButtonModule,
        NbIconModule,
        NbSelectModule,
        NbBadgeModule,
    ],
    providers: [NbAutocompleteDirective, NbMenuService],
    exports: [
        CardListingComponent,
        CardVendorComponent,
        InputValidateWrapperComponent,
        ListListingsComponent,
        SearchLocationComponent,
        SearchSmartItemsComponent,
        TopBannerComponent,
    ],
})
export class SharedModule {}