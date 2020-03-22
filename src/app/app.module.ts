import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HelloPageComponent } from "./hello-page/hello-page.component";
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
import { DbServiceService } from "src/@features/services/db-service.service";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";

//Injectables

@NgModule({
    declarations: [
        AppComponent,
        HelloPageComponent,
        FooterComponent,
        MainListComponent,
        TopBannerComponent,
        SearchLocationComponent,
        SearchSmartItemsComponent,
        CardVendorComponent
    ],
    imports: [
        BrowserModule,
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
        AngularFirestoreModule
    ],
    providers: [DbServiceService],
    bootstrap: [AppComponent]
})
export class AppModule {}
