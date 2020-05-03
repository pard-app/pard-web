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
    NbFormFieldModule,
    NbSpinnerModule,
    NbAlertModule,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { CardVendorComponent } from "./card-vendor/card-vendor.component";
import { InputValidateWrapperComponent } from "./input-validate-wrapper/input-validate-wrapper.component";
import { ListListingsComponent } from "./list-listings/list-listings.component";
import { SearchLocationComponent } from "./search-location/search-location.component";
import { SearchSmartItemsComponent } from "./search-smart-items/search-smart-items.component";
import { CardListingComponent } from "./card-listing/card-listing.component";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListVendorsComponent } from "./list-vendors/list-vendors.component";
import { ButtonLoadMoreComponent } from "./button-load-more/button-load-more.component";
import { NearMeItemsComponent } from "./near-me-items/near-me-items.component";
import { LoadingBoxComponent } from "./loading-box/loading-box.component";

@NgModule({
    declarations: [
        CardListingComponent,
        CardVendorComponent,
        InputValidateWrapperComponent,
        ListListingsComponent,
        SearchLocationComponent,
        SearchSmartItemsComponent,
        ListVendorsComponent,
        ButtonLoadMoreComponent,
        NearMeItemsComponent,
        LoadingBoxComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NbEvaIconsModule,
        NbAutocompleteModule,
        NbCardModule,
        NbInputModule,
        NbButtonModule,
        NbFormFieldModule,
        NbIconModule,
        NbSelectModule,
        NbBadgeModule,
        NbSpinnerModule,
        NbAlertModule,
    ],
    providers: [NbAutocompleteDirective, NbMenuService],
    exports: [
        CardListingComponent,
        CardVendorComponent,
        InputValidateWrapperComponent,
        ListListingsComponent,
        SearchLocationComponent,
        SearchSmartItemsComponent,
        ListVendorsComponent,
        ButtonLoadMoreComponent,
        NearMeItemsComponent,
    ],
})
export class SharedModule {}
