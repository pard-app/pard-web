import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationAndListingComponent } from "./location-and-listing/location-and-listing.component";
import { NothingComponent } from "./nothing/nothing.component";
import { OnlyListingComponent } from "./only-listing/only-listing.component";
import { OnlyLocationComponent } from "./only-location/only-location.component";
import { SharedModule } from "@shared/shared.module";
import { NbButtonModule, NbIconModule } from "@nebular/theme";
import { TranslateModule } from "@ngx-translate/core";
import { LandingComponent } from "./landing/landing.component";

@NgModule({
    declarations: [LocationAndListingComponent, NothingComponent, OnlyListingComponent, OnlyLocationComponent, LandingComponent],
    imports: [CommonModule, SharedModule, NbButtonModule, TranslateModule, NbButtonModule, NbIconModule],
    exports: [LocationAndListingComponent, NothingComponent, OnlyListingComponent, OnlyLocationComponent, LandingComponent],
})
export class ScenariosModule {}
