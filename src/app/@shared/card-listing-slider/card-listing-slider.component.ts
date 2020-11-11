import { Component, Input, OnInit } from "@angular/core";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";

@Component({
    selector: "app-card-listing-slider",
    templateUrl: "./card-listing-slider.component.html",
    styleUrls: ["./card-listing-slider.component.scss"],
})
export class CardListingSliderComponent implements OnInit {
    config: SwiperConfigInterface = {
        direction: "horizontal",
        slidesPerView: 1,
        slideToClickedSlide: true,
        mousewheel: false,
        scrollbar: false,
        watchSlidesProgress: true,
        navigation: true,
        keyboard: false,
        pagination: true,
        centeredSlides: true,
        loop: false,
    };

    @Input() listings: any;

    constructor() {}

    ngOnInit(): void {}
}
