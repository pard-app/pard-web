import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { CartStoreService } from "@core/stores/cart/cart.store.service";
import { Subscription } from "rxjs";
import { NbPopoverDirective, NbMenuService } from "@nebular/theme";
import { ListingItem } from "src/app/@core/models/listingitem.interface";
import { TranslateService } from "@ngx-translate/core";
import { ROUTING_CONSTANTS } from "src/app/@core/constants/routing.constants";
import { Router } from "@angular/router";
import { MainSearchStore } from "@core/stores/mainsearch/mainsearch.store";
import { filter, map } from "rxjs/operators";
import { NbIconLibraries } from "@nebular/theme";

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
        { title: this.translate.instant("ABOUT"), url: "https://about.pard.app/" },
    ];

    public globalRoutes = ROUTING_CONSTANTS;
    public lastItemAddedToCartSubscribtion: Subscription;
    public lastItemAddedToCart: ListingItem = null;
    private timer: ReturnType<typeof setTimeout>;
    public isMobileLayout = false;
    public languages: Array<Object>;
    public language: string;

    @ViewChild(NbPopoverDirective) addedNotificationPopover: NbPopoverDirective;

    constructor(
        private router: Router,
        private cartStoreService: CartStoreService,
        private translate: TranslateService,
        private mainSearchStore: MainSearchStore,
        private nbMenuService: NbMenuService,
        private iconLibraries: NbIconLibraries
    ) {
        this.iconLibraries.registerFontPack("flag-icon", { iconClassPrefix: "flag-icon" });
    }

    ngOnInit(): void {
        this.lastItemAddedToCartSubscribtion = this.cartStoreService._lastAddedItem$.subscribe((item) => {
            this.lastItemAddedToCart = item;
            this.addedNotificationPopover && this.handleNewItemNotification(item);
        });
        this.checkForMobileSize();
        this.languages = [
            { title: "en", icon: { icon: "gb", pack: "flag-icon" } },
            { title: "lt", icon: { icon: "lt", pack: "flag-icon" } },
            { title: "lv", icon: { icon: "lv", pack: "flag-icon" } },
        ];
        this.nbMenuService
            .onItemClick()
            .pipe(
                filter(({ tag }) => tag === "languages-menu"),
                map(({ item: { title } }) => title)
            )
            .subscribe((title) => {
                this.setLanguage(title);
            });

        this.language = this.translate.currentLang;
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

    navigateToMainPage() {
        this.router.navigate([ROUTING_CONSTANTS.ROOT]);
        this.mainSearchStore.searchChange({ listingOrVendor: null, location: null });
    }

    setLanguage(lang: string) {
        this.language = lang;
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
