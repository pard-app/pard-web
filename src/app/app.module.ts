import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HelloPageComponent } from "./hello-page/hello-page.component";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { MatFormField } from "@angular/material/form-field";

@NgModule({
    declarations: [AppComponent, HelloPageComponent],
    imports: [BrowserModule, AppRoutingModule, NoopAnimationsModule, MatAutocomplete, MatFormField],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
