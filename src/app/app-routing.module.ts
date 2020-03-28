import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainListComponent } from "./modules/main-list/main-list.component";

const routes: Routes = [
    { path: "marketplace", component: MainListComponent },
    { path: "", component: MainListComponent },
    { path: "vendor", loadChildren: () => import("./modules/vendor/vendor-routing.module").then(m => m.VendorRoutingModule) },
    { path: "cart", loadChildren: () => import("./modules/cart/cart-routing.module").then(m => m.CartRoutingModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
