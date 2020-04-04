import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CartStoreService } from "src/app/@core/stores/cart/cart.store.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent {
    title = "Pard";
    constructor(private translate: TranslateService, private cartStoreService: CartStoreService) {
        this.translate.setDefaultLang("en");
        this.translate.use(this.translate.getBrowserLang());
        this.cartStoreService.syncLocalStorageToListings();
    }
}
