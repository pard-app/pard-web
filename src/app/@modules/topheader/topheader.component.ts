import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { CartStoreService } from "@core/stores/cart/cart.store.service";
import { Subscription } from "rxjs";
import { NbPopoverDirective } from "@nebular/theme";
import { ListingItem } from "src/app/@core/models/listingitem.interface";
import { TranslateService } from "@ngx-translate/core";
import ROUTES from "src/app/@core/constants/routing.constants";

@Component({
    selector: "app-topheader",
    templateUrl: "./topheader.component.html",
    styleUrls: ["./topheader.component.scss"],
})
export class TopheaderComponent implements OnInit, OnDestroy {
    public items = [
        { title: this.translate.instant("HOME"), link: "/" },
        { title: this.translate.instant("APP"), url: "https://pard.app" },
        { title: this.translate.instant("ABOUT"), url: "https://pard.lt/" },
    ];

    public globalRoutes = ROUTES;
    public lastItemAddedToCartSubscribtion: Subscription;
    public lastItemAddedToCart: ListingItem = null;
    private timer: ReturnType<typeof setTimeout>;

    @ViewChild(NbPopoverDirective) addedNotificationPopover: NbPopoverDirective;

    constructor(private cartStoreService: CartStoreService, private translate: TranslateService) {}

    ngOnInit(): void {
        this.lastItemAddedToCartSubscribtion = this.cartStoreService._lastAddedItem$.subscribe((item) => {
            this.lastItemAddedToCart = item;
            this.addedNotificationPopover && this.handleNewItemNotification(item);
        });
    }

    handleNewItemNotification(item) {
        const TIME_TO_CLOSE = 4000;
        clearTimeout(this.timer);
        this.addedNotificationPopover.show();
        this.timer = setTimeout(() => {
            this.addedNotificationPopover.hide();
        }, TIME_TO_CLOSE);
    }

    setLanguage(lang: string) {
        this.translate.use(lang);
    }

    getQuantity(id: string): number {
        if (this.cartStoreService.get("cartItems")[id]) return this.cartStoreService.get("cartItems")[id].quantity;
    }

    get count() {
        return this.cartStoreService.cartItemsLength;
    }

    ngOnDestroy(): void {
        this.lastItemAddedToCartSubscribtion.unsubscribe();
    }
}
