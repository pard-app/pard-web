import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NbLayoutModule, NbButtonModule, NbCardModule, NbIconModule, NbContextMenuModule, NbPopoverModule, NbMenuModule } from "@nebular/theme";
import { TopheaderComponent } from "./topheader.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [TopheaderComponent],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        NbContextMenuModule,
        NbMenuModule,
        NbLayoutModule,
        NbButtonModule,
        NbPopoverModule,
        NbCardModule,
        NbIconModule,
    ],
    exports: [TopheaderComponent],
})
export class TopheaderModule {}
