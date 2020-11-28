import { Component, OnInit } from "@angular/core";
import { AlgoliaService } from "@services/algolia/algolia.service";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";

@Component({
    selector: "app-banner",
    templateUrl: "./banner.component.html",
    styleUrls: ["./banner.component.scss"],
})
export class BannerComponent implements OnInit {
    config: SwiperConfigInterface = {
        direction: "horizontal",
        slidesPerView: 1,
        slideToClickedSlide: true,
        mousewheel: false,
        scrollbar: false,
        watchSlidesProgress: true,
        // navigation: true,
        keyboard: false,
        //pagination: true,
        centeredSlides: true,
        loop: false,
    };
    constructor(public algoliaService: AlgoliaService) {}

    ngOnInit(): void {}
}
