import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainListListingsComponent } from "./main-list-listings.component";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { NbButtonModule, NbIconModule } from "@nebular/theme";

@NgModule({
    declarations: [MainListListingsComponent],
    imports: [CommonModule, TranslateModule, SharedModule, NbButtonModule, NbIconModule],
    exports: [MainListListingsComponent],
})
export class MainListListingsModule {}
