import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartRoutingModule } from "./cart-routing.module";
import { CartListingsComponent } from "./cart-listings/cart-listings.component";
import { CartCheckoutComponent } from "./cart-checkout/cart-checkout.component";
import { CartSummaryComponent } from "./cart-summary/cart-summary.component";
import { TranslateModule } from "@ngx-translate/core";
import { CartComponent } from "./cart-page/cart.component";
import {
    NbCardModule,
    NbStepperModule,
    NbCheckboxModule,
    NbUserModule,
    NbProgressBarModule,
    NbOptionModule,
    NbSelectModule,
    NbButtonModule,
} from "@nebular/theme";
import { SharedModule } from "@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CartCheckoutModule } from "./cart-checkout/cart-checkout.module";
import { CartListingsModule } from "./cart-listings/cart-listings.module";
import { CartSummaryModule } from "./cart-summary/cart-summary.module";
import { CartPageModule } from "./cart-page/cart-page.module";

@NgModule({
    declarations: [],
    imports: [CartCheckoutModule, CartListingsModule, CartSummaryModule, CartPageModule],
    exports: [],
})
export class CartModule {}
