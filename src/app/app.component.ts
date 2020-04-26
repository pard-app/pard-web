import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CartStoreService } from "src/app/@core/stores/cart/cart.store.service";
import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from "ngx-cookieconsent";
import { Subscription } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    constructor(private translate: TranslateService, private cartStoreService: CartStoreService, private ccService: NgcCookieConsentService) {
        this.translate.setDefaultLang("en");
        this.translate.use(this.translate.getBrowserLang());
        this.cartStoreService.syncLocalStorageToListings();
    }

    ngOnInit() {
        // Needed for translations
        this.translate
            .get(["cookie.header", "cookie.message", "cookie.dismiss", "cookie.allow", "cookie.deny", "cookie.link", "cookie.policy"])
            .subscribe((data) => {
                this.ccService.getConfig().content = this.ccService.getConfig().content || {};
                // Override default messages with the translated ones
                this.ccService.getConfig().content.header = data["cookie.header"];
                this.ccService.getConfig().content.message = data["cookie.message"];
                this.ccService.getConfig().content.dismiss = data["cookie.dismiss"];
                this.ccService.getConfig().content.allow = data["cookie.allow"];
                this.ccService.getConfig().content.deny = data["cookie.deny"];
                this.ccService.getConfig().content.link = data["cookie.link"];
                this.ccService.getConfig().content.policy = data["cookie.policy"];

                this.ccService.destroy(); // remove previous cookie bar (with default messages)
                this.ccService.init(this.ccService.getConfig()); // update config with translated messages
            });
    }
}
