import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HelloPageComponent } from "./hello-page/hello-page.component";
import { PageVendorsListComponent } from "./page-vendors-list/page-vendors-list.component";

const routes: Routes = [
    { path: "marketplace", component: PageVendorsListComponent },
    { path: "", component: HelloPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
