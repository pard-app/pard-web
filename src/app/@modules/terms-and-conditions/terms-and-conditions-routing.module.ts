import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TermsAndConditionsComponent } from "./terms-and-conditions-page/terms-and-conditions.component";

export const TERMS_AND_CONDITIONS_ROUTES: Routes = [{ path: "", component: TermsAndConditionsComponent }];

@NgModule({
    imports: [RouterModule.forChild(TERMS_AND_CONDITIONS_ROUTES)],
    exports: [RouterModule],
})
export class TermsAndConditionsRoutingModule {}
