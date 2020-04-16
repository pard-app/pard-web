import { Component, OnInit } from "@angular/core";
import { LocationStore } from "@core/stores/location/location.store";
import { ListingService } from "@services/listing/listing.service";
import { debounce } from "rxjs/operators";
import { interval, Subscription } from "rxjs";

@Component({
    selector: "scenario-only-location",
    templateUrl: "./only-location.component.html",
    styleUrls: ["./only-location.component.scss"],
})
export class OnlyLocationComponent implements OnInit {
    private subscriptions = new Subscription();

    constructor(public locationStore: LocationStore, private listingService: ListingService) {}

    ngOnInit(): void {
        const subscribeToGlobalLocationChanges = this.locationStore.currentLocation$.pipe(debounce(() => interval(50))).subscribe(async (currentLocation) => {
            console.log(currentLocation);
        });
        this.subscriptions.add(subscribeToGlobalLocationChanges);
    }
}
