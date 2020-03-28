import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainListComponent } from "./modules/main-list/main-list.component";
import { VendorListingsComponent } from "./modules/vendor/vendor-listings.component";
import { CartRoutingModule, CART_ROUTES } from "./modules/cart/cart-routing.module";

const routes: Routes = [
    { path: "marketplace", component: MainListComponent },
    { path: "", component: MainListComponent },
    { path: "vendor/:vendorId", component: VendorListingsComponent },
    // https://github.com/akveo/nebular/issues/1136
    { path: "cart", loadChildren: () => import("./modules/cart/cart-routing.module").then(m => m.CartRoutingModule) }
    // { path: "cart", children: CART_ROUTES }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
