import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer.component";
import { NbIconModule, NbButtonModule } from "@nebular/theme";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [FooterComponent],
    imports: [CommonModule, NbIconModule, NbButtonModule, TranslateModule, RouterModule],
    exports: [FooterComponent],
})
export class FooterModule {}
