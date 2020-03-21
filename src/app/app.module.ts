import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HelloPageComponent } from "./hello-page/hello-page.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSliderModule } from "@angular/material/slider";

@NgModule({
    declarations: [AppComponent, HelloPageComponent],
    imports: [BrowserModule, AppRoutingModule, NoopAnimationsModule, MatAutocompleteModule, MatFormFieldModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
