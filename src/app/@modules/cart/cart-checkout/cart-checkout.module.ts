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
} from "@nebular/theme";
import { SharedModule } from "../../../@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ReCaptchaV3Service } from "ng-recaptcha";

@NgModule({
    declarations: [CartCheckoutComponent],
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
        NbDialogModule.forChild(),
    ],
    exports: [CartCheckoutComponent],
})
export class CartCheckoutModule {}
