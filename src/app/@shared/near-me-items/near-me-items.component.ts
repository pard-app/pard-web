import { Component, OnInit } from "@angular/core";
import { Observable, BehaviorSubject, timer, of, Subject } from "rxjs";
import { ListingItem } from "@models/listingitem.interface";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";
import { HttpClient } from "@angular/common/http";
import { map, delay, tap, mergeMap, finalize, filter, defaultIfEmpty, startWith } from "rxjs/operators";
import { IVendor } from "@models/vendor.interface";

@Component({
    selector: "app-near-me-items",
    templateUrl: "./near-me-items.component.html",
    styleUrls: ["./near-me-items.component.scss"],
})
export class NearMeItemsComponent implements OnInit {
    private _topVendorsNearMe$ = new BehaviorSubject<Array<IVendor | any>>([{}]);
    private _waitLocalVendors$ = new BehaviorSubject({
        waiting: true,
        waitedForTooLong: false,
    });

    public readonly topVendorsNearMe$: Observable<Array<IVendor | any>> = this._topVendorsNearMe$.asObservable();
    public readonly waitLocalVendors$: Observable<any> = this._waitLocalVendors$.asObservable();

    constructor(private vendorService: VendorService, private listingService: ListingService, private http: HttpClient) {}

    async ngOnInit() {
        this.handleTopNearMe();
    }

    private async handleTopNearMe() {
        timer(1000)
            .toPromise()
            .then(() => {
                if (this._waitLocalVendors$.getValue().waiting) {
                    this._waitLocalVendors$.next({ waiting: true, waitedForTooLong: true });
                }
            });

        const { cityLatLong } = (await this.http.get("https://europe-west1-pard-app.cloudfunctions.net/geolocation").toPromise()) as { cityLatLong: string };
        const data = await this.vendorService
            .searchVendor({ query: "", aroundLatLng: cityLatLong, hitsPerPage: 6 })
            .pipe(
                mergeMap(async ({ hits }: any) => await this.listingService.fillVendorWithItsListings(hits)),
                finalize(() => {
                    const currentVal = this._waitLocalVendors$.getValue();
                    currentVal.waiting && this._waitLocalVendors$.next({ ...currentVal, waiting: false });
                }),
                startWith([{}])
            )
            .toPromise();
        this._topVendorsNearMe$.next(data);
    }

    public displayVendorsOnClick(): void {
        this._waitLocalVendors$.next({ waiting: false, waitedForTooLong: false });
    }
}
