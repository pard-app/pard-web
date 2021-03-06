import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchBoxComponent } from "./search-box.component";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { NbButtonModule, NbIconModule, NbCardModule, NbCheckboxModule } from "@nebular/theme";

@NgModule({
    declarations: [SearchBoxComponent],
    imports: [CommonModule, TranslateModule, SharedModule, NbCardModule, NbCheckboxModule, NbIconModule, NbButtonModule],
    exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
