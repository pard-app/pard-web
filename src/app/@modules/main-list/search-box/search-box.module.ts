import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchBoxComponent } from "./search-box.component";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [SearchBoxComponent],
    imports: [CommonModule, TranslateModule, SharedModule],
    exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
