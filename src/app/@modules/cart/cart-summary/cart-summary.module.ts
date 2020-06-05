import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbCardModule, NbButtonModule, NbListComponent, NbListModule } from "@nebular/theme";
import { TranslateModule } from "@ngx-translate/core";
import { CartSummaryComponent } from "./cart-summary.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [CartSummaryComponent],
    imports: [CommonModule, RouterModule, CommonModule, TranslateModule, NbCardModule, NbButtonModule, NbListModule],
    exports: [CartSummaryComponent],
})
export class CartSummaryModule {}
