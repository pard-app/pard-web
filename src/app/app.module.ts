import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { NgModule, DEFAULT_CURRENCY_CODE } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { DbService } from "@services/db-service/db-service.service";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
// NEBULAR MODULES
import { NbAutocompleteDirective, NbLayoutModule, NbThemeModule, NbMenuModule } from "@nebular/theme";

import { VendorModule } from "@modules/vendor/vendor.module";
import { AngularFireFunctionsModule, REGION } from "@angular/fire/functions";
import { CartModule } from "@modules/cart/cart.module";
import { MainListModule } from "@modules/main-list/main-list.module";
import { FooterModule } from "@modules/footer/footer.module";
import { SharedModule } from "@shared/shared.module";
import { TopheaderModule } from "@modules/topheader/topheader.module";
@NgModule({
    declarations: [AppComponent],
    imports: [
        // 3'RD PT
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbLayoutModule,
        NbThemeModule.forRoot({ name: "corporate" }),
        NbMenuModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireFunctionsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http) => new TranslateHttpLoader(http, "./assets/i18n/", ".json"),
                deps: [HttpClient],
            },
        }),
        // LOCAL Modules
        VendorModule,
        CartModule,
        MainListModule,
        FooterModule,
        SharedModule,
        TopheaderModule,
    ],
    providers: [DbService, NbAutocompleteDirective, { provide: DEFAULT_CURRENCY_CODE, useValue: "EUR" }, { provide: REGION, useValue: "europe-west1" }],
    bootstrap: [AppComponent],
})
export class AppModule {}
