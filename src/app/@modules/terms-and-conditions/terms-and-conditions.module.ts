import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbCardModule, NbDialogModule, NbButtonModule } from "@nebular/theme";
import { TermsAndConditionsComponent } from "./terms-and-conditions-page/terms-and-conditions.component";
import { TermsAndConditionsModalComponent } from "./terms-and-conditions-page/terms-and-conditions-modal.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [TermsAndConditionsComponent, TermsAndConditionsModalComponent],
    imports: [CommonModule, NbCardModule, TranslateModule, NbDialogModule, NbButtonModule, NbDialogModule.forChild()],
    exports: [TermsAndConditionsComponent, TermsAndConditionsModalComponent],
})
export class TermsAndConditionsModule {}
