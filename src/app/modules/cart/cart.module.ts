import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartRoutingModule } from "./cart-routing.module";
import { CartListingCardComponent } from "./cart-page/cart-listing-card/cart-listing-card.component";
import { CartListingsComponent } from './cart-listings/cart-listings.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';

@NgModule({
    declarations: [CartListingsComponent, CartSummaryComponent],
    imports: [CommonModule, CartRoutingModule]
})
export class CartModule {}
