import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart-page/cart.component";
import { CartCheckoutComponent } from './cart-checkout/cart-checkout.component';

@NgModule({
    declarations: [CartComponent, CartCheckoutComponent],
    imports: [CommonModule, CartRoutingModule]
})
export class CartModule {}
