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
import { NgcCookieConsentModule, NgcCookieConsentConfig } from "ngx-cookieconsent";

// NEBULAR MODULES
import { NbAutocompleteDirective, NbLayoutModule, NbThemeModule, NbMenuModule } from "@nebular/theme";

import { VendorModule } from "@modules/vendor/vendor.module";
import { AngularFireFunctionsModule, REGION } from "@angular/fire/functions";
import { CartModule } from "@modules/cart/cart.module";
import { MainListModule } from "@modules/main-list/main-list.module";
import { FooterModule } from "@modules/footer/footer.module";
import { SharedModule } from "@shared/shared.module";
import { TopheaderModule } from "@modules/topheader/topheader.module";
import { PrivacyPolicyModule } from "@modules/privacy-policy/privacy-policy.module";
import { TermsAndConditionsModule } from "@modules/terms-and-conditions/terms-and-conditions.module";

const cookieConfig: NgcCookieConsentConfig = {
    cookie: {
        domain: "localhost", // @TODO need a way to set this programmatically depending on the website // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
    },
    palette: {
        popup: {
            background: "rgba(255, 255, 255, 0.48)",
            text: "#000",
        },
        button: {
            background: "#0095ff",
        },
    },
    theme: "edgeless",
    type: "info",
};

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
        NgcCookieConsentModule.forRoot(cookieConfig),
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
        PrivacyPolicyModule,
        TermsAndConditionsModule,
    ],
    providers: [DbService, NbAutocompleteDirective, { provide: DEFAULT_CURRENCY_CODE, useValue: "EUR" }, { provide: REGION, useValue: "europe-west1" }],
    bootstrap: [AppComponent],
})
export class AppModule {}
