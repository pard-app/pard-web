import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbCardModule } from "@nebular/theme";
import { TermsAndConditionsComponent } from "./terms-and-conditions-page/terms-and-conditions.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [TermsAndConditionsComponent],
    imports: [CommonModule, NbCardModule, TranslateModule],
    exports: [TermsAndConditionsComponent],
})
export class TermsAndConditionsModule {}
