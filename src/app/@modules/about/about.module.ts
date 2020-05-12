import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbCardModule } from "@nebular/theme";
import { AboutComponent } from "./about-page/about.component";

@NgModule({
    declarations: [AboutComponent],
    imports: [CommonModule, NbCardModule],
    exports: [AboutComponent],
})
export class AboutModule {}
