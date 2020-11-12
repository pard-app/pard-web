import { Component, OnInit } from "@angular/core";
import { Observable, BehaviorSubject, timer, of, Subject } from "rxjs";
import { VendorService } from "@services/vendor/vendor.service";
import { ListingService } from "@services/listing/listing.service";
import { HttpClient } from "@angular/common/http";
import { mergeMap, finalize, startWith } from "rxjs/operators";
import { IVendor } from "@models/vendor.interface";

@Component({
    selector: "app-near-me-items",
    templateUrl: "./near-me-items.component.html",
    styleUrls: ["./near-me-items.component.scss"],
})
export class NearMeItemsComponent implements OnInit {
    private _topVendorsNearMe$ = new BehaviorSubject<Array<IVendor | any>>([{}]);
    public readonly topVendorsNearMe$: Observable<Array<IVendor | any>> = this._topVendorsNearMe$.asObservable();

    public position: any;
    public locationDenied: Boolean = false;
    public askForLocation: Boolean = false;

    constructor(private vendorService: VendorService, private listingService: ListingService, private http: HttpClient) {}

    async ngOnInit() {
        this.checkIfCanAccessLocation();
    }

    private async handleTopNearMe() {
        const locationAsString = `${this.position.coords.latitude},${this.position.coords.longitude}`;
        //const locationAsString = "54.7008017,25.1126097";
        const data = await this.vendorService
            .searchVendor({ query: "", aroundLatLng: locationAsString, hitsPerPage: 6 })
            .pipe(
                mergeMap(async ({ hits }: any) => await this.listingService.fillVendorWithItsListings(hits)),
                startWith([{}])
            )
            .toPromise();
        this._topVendorsNearMe$.next(data);
    }

    getBrowserGeolocation(options?: PositionOptions): Promise<Position> {
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, options));
    }

    private checkIfCanAccessLocation() {
        navigator.permissions.query({ name: "geolocation" }).then((status) => {
            if (status.state == "granted") {
                this.getLocation();
            } else if (status.state == "prompt") {
                this.askForLocation = true;
            } else {
                this.locationDenied = true;
            }
        });
    }

    public async getLocation() {
        this.getBrowserGeolocation()
            .then((position) => {
                this.askForLocation = false;
                this.position = position;
                this.handleTopNearMe();
            })
            .catch((err) => {
                this.locationDenied = true;
            });
    }
}
