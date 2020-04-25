import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbCardModule } from "@nebular/theme";
import { PrivacyPolicyComponent } from "./privacy-policy-page/privacy-policy.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [PrivacyPolicyComponent],
    imports: [CommonModule, NbCardModule, TranslateModule],
    exports: [PrivacyPolicyComponent],
})
export class PrivacyPolicyModule {}
