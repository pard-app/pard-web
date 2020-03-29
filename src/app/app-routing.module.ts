import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainListComponent } from "./modules/main-list/main-list.component";
import ROUTES from "@constants/routing.constants";

const routes: Routes = [
    { path: ROUTES.MARKET_PAGE, component: MainListComponent },
    { path: ROUTES.ROOT, component: MainListComponent },
    { path: ROUTES.VENDOR_PAGE_ROOT, loadChildren: () => import("./modules/vendor/vendor-routing.module").then(m => m.VendorRoutingModule) },
    { path: ROUTES.CART_PAGE_ROOT, loadChildren: () => import("./modules/cart/cart-routing.module").then(m => m.CartRoutingModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
