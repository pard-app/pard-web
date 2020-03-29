import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartRoutingModule } from "./cart-routing.module";
import { CartListingCardComponent } from './cart-page/cart-listing-card/cart-listing-card.component';

@NgModule({
    declarations: [CartListingCardComponent],
    imports: [CommonModule, CartRoutingModule]
})
export class CartModule {}
