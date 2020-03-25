import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
// import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";
import { IVendor } from "@models/vendor.interface";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DbServiceService {
    constructor(public store: AngularFirestore) {}

    getMyListings(address = null) {
        if (address) {
            return this.store
                .collection<IVendor>("vendors", ref => ref.where("address", "==", address))
                .valueChanges({ idField: "id" });
        } else {
            return this.store.collection<IVendor>("vendors").valueChanges({ idField: "id" });
        }
    }

    getVendorListings(vendor: string): Observable<Array<any>> {
        return this.store.collection("listings", ref => ref.where("vendor", "==", `${vendor}`)).valueChanges();
    }

    getListings(): Observable<Array<any>> {
        return this.store.collection("listings").valueChanges({ idField: "id" });
    }
}
