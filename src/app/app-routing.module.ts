import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HelloPageComponent } from "./hello-page/hello-page.component";
import { MainListComponent } from "./main-list/main-list.component";

const routes: Routes = [
    { path: "marketplace", component: MainListComponent },
    { path: "", component: HelloPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
