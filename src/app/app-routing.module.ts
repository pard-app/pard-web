import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HelloPageComponent } from "./hello-page/hello-page.component";
import { MainListComponent } from "./main-list/main-list.component";
import { VendorListingsComponent } from "./vendor-listings/vendor-listings.component";

const routes: Routes = [
  { path: "marketplace", component: MainListComponent },
  { path: "", component: MainListComponent },
  { path: "vendor/:vendorId", component: VendorListingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
