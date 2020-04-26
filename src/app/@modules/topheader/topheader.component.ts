import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { CartStoreService } from "@core/stores/cart/cart.store.service";
import { Subscription } from "rxjs";
import { NbPopoverDirective } from "@nebular/theme";
import { ListingItem } from "src/app/@core/models/listingitem.interface";
import { TranslateService } from "@ngx-translate/core";
import { ROUTING_CONSTANTS } from "src/app/@core/constants/routing.constants";
import { Router } from "@angular/router";

interface IRoute {
    title: string;
    link?: string;
    url?: string;
}

type IRoutes = IRoute[];

@Component({
    selector: "app-topheader",
    templateUrl: "./topheader.component.html",
    styleUrls: ["./topheader.component.scss"],
})
export class TopheaderComponent implements OnInit, OnDestroy {
    public TOP_HEADER_NAVIGATION_ROUTES: IRoutes = [
        { title: this.translate.instant("SHOP"), link: "/" },
        { title: this.translate.instant("APP"), url: "https://pard.app" },
        { title: this.translate.instant("ABOUT"), url: "https://pard.lt/" },
    ];

    public globalRoutes = ROUTING_CONSTANTS;
    public lastItemAddedToCartSubscribtion: Subscription;
    public lastItemAddedToCart: ListingItem = null;
    private timer: ReturnType<typeof setTimeout>;
    public isMobileLayout = false;

    @ViewChild(NbPopoverDirective) addedNotificationPopover: NbPopoverDirective;

    constructor(private router: Router, private cartStoreService: CartStoreService, private translate: TranslateService) {}

    ngOnInit(): void {
        this.lastItemAddedToCartSubscribtion = this.cartStoreService._lastAddedItem$.subscribe((item) => {
            this.lastItemAddedToCart = item;
            this.addedNotificationPopover && this.handleNewItemNotification(item);
        });
        this.checkForMobileSize();
    }

    private checkForMobileSize() {
        const MOBILE_SIZE = 1000;
        this.isMobileLayout = window.innerWidth <= MOBILE_SIZE;
        window.onresize = () => (this.isMobileLayout = window.innerWidth <= MOBILE_SIZE);
    }

    public handleRedirect({ title, url, link }: IRoute) {
        if (url) return (window.location.href = url);
        if (link) return this.router.navigate([link]);
    }

    private handleNewItemNotification(item) {
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
