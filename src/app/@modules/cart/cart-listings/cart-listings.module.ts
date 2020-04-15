import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartListingCardComponent } from "./cart-listing-card/cart-listing-card.component";
import { NbOptionModule, NbCardModule, NbButtonModule, NbInputModule } from "@nebular/theme";
import { CartListingsComponent } from "./cart-listings.component";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [CartListingCardComponent, CartListingsComponent],
    imports: [CommonModule, TranslateModule, NbCardModule, NbButtonModule, NbInputModule, FormsModule],
    exports: [CartListingCardComponent, CartListingsComponent],
})
export class CartListingsModule {}
