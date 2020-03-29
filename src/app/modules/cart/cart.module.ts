import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartRoutingModule } from "./cart-routing.module";
import { CartListingsComponent } from "./cart-listings/cart-listings.component";

@NgModule({
    declarations: [CartListingsComponent],
    imports: [CommonModule, CartRoutingModule],
    exports: []
})
export class CartModule {}
