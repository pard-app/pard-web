import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart.component";
import { TranslateModule } from "@ngx-translate/core";
import { NbCardModule, NbButtonModule } from "@nebular/theme";
import { SharedModule } from "@shared/shared.module";
import { CartCheckoutModule } from "../cart-checkout/cart-checkout.module";
import { CartListingsModule } from "../cart-listings/cart-listings.module";
import { CartSummaryModule } from "../cart-summary/cart-summary.module";

@NgModule({
    declarations: [CartComponent],
    imports: [
        CommonModule,
        SharedModule,
        CommonModule,
        TranslateModule,
        NbCardModule,
        NbButtonModule,
        CartListingsModule,
        CartSummaryModule,
        CartCheckoutModule,
    ],
    exports: [CartComponent],
})
export class CartPageModule {}
