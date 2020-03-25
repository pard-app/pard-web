import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainListComponent } from "./modules/main-list/main-list.component";
import { VendorListingsComponent } from "./globalComponents/vendor-listings/vendor-listings.component";
import { CartRoutingModule } from "./modules/cart/cart-routing.module";

const routes: Routes = [
    { path: "marketplace", component: MainListComponent },
    { path: "", component: MainListComponent },
    { path: "vendor/:vendorId", component: VendorListingsComponent },
    { path: "cart", loadChildren: () => import("./modules/cart/cart-routing.module").then(m => m.CartRoutingModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
