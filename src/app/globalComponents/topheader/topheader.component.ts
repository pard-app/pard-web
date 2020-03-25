import { Component, OnInit } from "@angular/core";
import { CartStoreService } from "src/app/@features/stores/cart/cart.store.service";

@Component({
    selector: "app-topheader",
    templateUrl: "./topheader.component.html",
    styleUrls: ["./topheader.component.scss"]
})
export class TopheaderComponent implements OnInit {
    public items = [{ title: "About", url: "https://pard.lt/" }, { title: "Log out" }];

    constructor(private cartStoreService: CartStoreService) {}

    ngOnInit(): void {}

    get count() {
        return this.cartStoreService.cartItems.length;
    }
}
