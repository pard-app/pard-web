import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainListVendorsComponent } from "./main-list-vendors.component";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [MainListVendorsComponent],
    imports: [CommonModule, TranslateModule, SharedModule],
    exports: [MainListVendorsComponent],
})
export class MainListVendorsModule {}
