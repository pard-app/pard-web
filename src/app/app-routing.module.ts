import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HelloPageComponent } from "./hello-page/hello-page.component";

const routes: Routes = [{ path: "", component: HelloPageComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
