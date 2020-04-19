import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LocationAndListingComponent } from "./location-and-listing/location-and-listing.component";
import { NothingComponent } from "./nothing/nothing.component";
import { OnlyListingComponent } from "./only-listing/only-listing.component";
import { OnlyLocationComponent } from "./only-location/only-location.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [LocationAndListingComponent, NothingComponent, OnlyListingComponent, OnlyLocationComponent],
    imports: [CommonModule, SharedModule],
    exports: [LocationAndListingComponent, NothingComponent, OnlyListingComponent, OnlyLocationComponent],
})
export class ScenariosModule {}
