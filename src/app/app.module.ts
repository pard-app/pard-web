import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "./footer/footer.component";
import { MainListComponent } from "./main-list/main-list.component";
import { TopBannerComponent } from "./top-banner/top-banner.component";
import { SearchLocationComponent } from "./search-location/search-location.component";
import { SearchSmartItemsComponent } from "./search-smart-items/search-smart-items.component";

// ANGULAR MATERIAL MODULES
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTabsModule } from "@angular/material/tabs";
import { CardVendorComponent } from "./card-vendor/card-vendor.component";
import { MatCardModule } from "@angular/material/card";
import { DbServiceService } from "src/app/@features/services/db-service.service";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { VendorListingsComponent } from "./vendor-listings/vendor-listings.component";
import { CardListingComponent } from "./card-listing/card-listing.component";
import {
    NbThemeModule,
    NbLayoutModule,
    NbAutocompleteModule,
    NbCardModule,
    NbOverlayModule,
    NbDialogModule,
    NbAutocompleteDirective,
    NbInputModule,
    NbFormFieldModule,
    NbOptionModule,
    NbCdkAdapterModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbSpinnerModule
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";

// NEBULAR MODULES

//Injectables

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        MainListComponent,
        TopBannerComponent,
        SearchLocationComponent,
        SearchSmartItemsComponent,
        CardVendorComponent,
        CardListingComponent,
        VendorListingsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatGridListModule,
        MatTabsModule,
        MatCardModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        //Nebular
        NbThemeModule.forRoot({ name: "corporate" }),
        NbLayoutModule,
        NbEvaIconsModule,
        NbAutocompleteModule,
        NbCardModule,
        NbOverlayModule,
        NbDialogModule,
        NbInputModule,
        NbFormFieldModule,
        NbOptionModule,
        NbTabsetModule,
        NbRouteTabsetModule,
        NbSpinnerModule
    ],
    providers: [DbServiceService, NbAutocompleteDirective],
    bootstrap: [AppComponent]
})
export class AppModule {}
