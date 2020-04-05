import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainListListingsComponent } from "./main-list-listings.component";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [MainListListingsComponent],
    imports: [CommonModule, TranslateModule, SharedModule],
    exports: [MainListListingsComponent],
})
export class MainListListingsModule {}
