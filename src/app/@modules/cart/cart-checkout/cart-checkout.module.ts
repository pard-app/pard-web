import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartCheckoutComponent } from "./cart-checkout.component";
import { TranslateModule } from "@ngx-translate/core";
import {
    NbInputModule,
    NbCardModule,
    NbStepperModule,
    NbCheckboxModule,
    NbButtonModule,
    NbUserModule,
    NbProgressBarModule,
    NbSpinnerModule,
    NbDialogModule,
    NbIconModule,
} from "@nebular/theme";
import { SharedModule } from "../../../@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PaymentComponent } from "./payment/payment.component";

@NgModule({
    declarations: [CartCheckoutComponent, PaymentComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NbProgressBarModule,
        TranslateModule,
        NbInputModule,
        NbCardModule,
        NbStepperModule,
        NbCheckboxModule,
        NbButtonModule,
        NbUserModule,
        NbSpinnerModule,
        SharedModule,
        NbIconModule,
        NbDialogModule.forChild(),
        // RecaptchaModule,
        // RecaptchaFormsModule,
    ],
    exports: [CartCheckoutComponent],
})
export class CartCheckoutModule {}
