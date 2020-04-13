import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MainListComponent } from "./main-list.component";
import { VendorModule } from "@modules/vendor/vendor.module";
import { SharedModule } from "@shared/shared.module";
import { NbTabsetModule, NbCardModule } from "@nebular/theme";
import { SearchBoxModule } from "./search-box/search-box.module";
import { MainListListingsModule } from "./main-list-listings/main-list-listings.module";
import { MainListVendorsModule } from "./main-list-vendors/main-list-vendors.module";
import { ScenariosModule } from "./scenarios/scenarios.module";

@NgModule({
    declarations: [MainListComponent],
    imports: [
        CommonModule,
        TranslateModule,
        VendorModule,
        SharedModule,
        NbTabsetModule,
        NbCardModule,
        SearchBoxModule,
        MainListListingsModule,
        MainListVendorsModule,
        ScenariosModule,
    ],
    exports: [MainListComponent],
})
export class MainListModule {}
