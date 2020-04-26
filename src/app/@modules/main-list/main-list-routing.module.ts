import { NgModule } from "@angular/core";
import { Routes, RouterModule, NavigationExtras } from "@angular/router";
import { MainListComponent } from "./main-list.component";

export const MAIN_LIST_ROUTES: Routes = [{ path: "", component: MainListComponent }];

@NgModule({
    imports: [RouterModule.forChild(MAIN_LIST_ROUTES)],
    exports: [RouterModule],
})
export class MainListRoutingModule {}
