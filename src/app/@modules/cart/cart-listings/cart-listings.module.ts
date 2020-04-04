import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartListingCardComponent } from "./cart-listing-card/cart-listing-card.component";
import { NbOptionModule, NbSelectModule, NbCardModule, NbButtonModule } from "@nebular/theme";
import { CartListingsComponent } from "./cart-listings.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [CartListingCardComponent, CartListingsComponent],
    imports: [CommonModule, TranslateModule, NbOptionModule, NbSelectModule, NbCardModule, NbButtonModule],
    exports: [CartListingCardComponent, CartListingsComponent],
})
export class CartListingsModule {}
