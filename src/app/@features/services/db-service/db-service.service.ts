import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentSnapshot, DocumentData } from "@angular/fire/firestore";
// import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";
import { IVendor } from "@models/vendor.interface";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ListingItem } from "@models/listingitem.interface";

@Injectable({
    providedIn: "root"
})
export class DbServiceService {
    constructor(public store: AngularFirestore) {}

    public getVendorById(id: string): Observable<IVendor> {
        return this.store
            .doc("vendors/" + id)
            .get()
            .pipe(map(x => x.data() as IVendor));
    }

    public getListingById(id: string): Observable<ListingItem | any> {
        return this.store
            .doc("listings/" + id)
            .get()
            .pipe(map(x => ({ data: x.data(), id: x.id })));
    }
}
