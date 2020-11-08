import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CartStoreService } from "src/app/@core/stores/cart/cart.store.service";
import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from "ngx-cookieconsent";
import { environment } from "src/environments/environment";
import { AngularFirestore } from "@angular/fire/firestore";
import { DbService } from "@services/db-service/db-service.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    constructor(
        private translate: TranslateService,
        private cartStoreService: CartStoreService,
        private ccService: NgcCookieConsentService,
        private dbService: DbService
    ) {
        this.translate.setDefaultLang("en");
        let language = this.translate.getBrowserLang();
        if (!environment.languages.find((supportedLanguage) => supportedLanguage == language)) {
            language = "en";
        }
        this.translate.use(language);
        this.cartStoreService.syncLocalStorageToListings();
    }

    ngOnInit() {
        //this.dbService.configuration;

        // Needed for translations
        this.translate
            .get(["cookie.header", "cookie.message", "cookie.dismiss", "cookie.allow", "cookie.deny", "cookie.link", "cookie.policy"])
            .subscribe((data) => {
                const cookieConfig = this.ccService.getConfig();
                cookieConfig.content = this.ccService.getConfig().content || {};
                const content = cookieConfig.content;

                // Override default messages with the translated ones
                content.header = data["cookie.header"];
                content.message = data["cookie.message"];
                content.dismiss = data["cookie.dismiss"];
                content.allow = data["cookie.allow"];
                content.deny = data["cookie.deny"];
                content.link = data["cookie.link"];
                content.policy = data["cookie.policy"];

                this.ccService.destroy(); // remove previous cookie bar (with default messages)
                this.ccService.init(cookieConfig); // update config with translated messages
            });
    }
}
