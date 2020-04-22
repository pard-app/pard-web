import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PrivacyPolicyComponent } from "./privacy-policy-page/privacy-policy.component";

export const PRIVACY_POLICY_ROUTES: Routes = [{ path: "", component: PrivacyPolicyComponent }];

@NgModule({
    imports: [RouterModule.forChild(PRIVACY_POLICY_ROUTES)],
    exports: [RouterModule],
})
export class PrivacyPolicyRoutingModule {}
