import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HelloPageComponent } from "./hello-page/hello-page.component";
// ANGULAR MATERIAL MODULES
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "./footer/footer.component";
import { MainListComponent } from "./main-list/main-list.component";
import { TopBannerComponent } from "./top-banner/top-banner.component";
import { SearchLocationComponent } from "./search-location/search-location.component";
import { SearchSmartItemsComponent } from "./search-smart-items/search-smart-items.component";

@NgModule({
    declarations: [
        AppComponent,
        HelloPageComponent,
        FooterComponent,
        MainListComponent,
        TopBannerComponent,
        SearchLocationComponent,
        SearchSmartItemsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
