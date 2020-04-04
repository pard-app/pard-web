import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MainListComponent } from "./main-list.component";
import { VendorModule } from "@modules/vendor/vendor.module";
import { SharedModule } from "@shared/shared.module";
import { NbTabsetModule, NbSpinnerModule, NbCardModule } from "@nebular/theme";
import { SearchBoxModule } from "./search-box/search-box.module";

@NgModule({
    declarations: [MainListComponent],
    imports: [CommonModule, TranslateModule, VendorModule, SharedModule, NbTabsetModule, NbSpinnerModule, NbCardModule, SearchBoxModule],
    exports: [MainListComponent],
})
export class MainListModule {}
