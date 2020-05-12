import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./about-page/about.component";

export const ABOUT_ROUTES: Routes = [{ path: "", component: AboutComponent }];

@NgModule({
    imports: [RouterModule.forChild(ABOUT_ROUTES)],
    exports: [RouterModule],
})
export class AboutRoutingModule {}
