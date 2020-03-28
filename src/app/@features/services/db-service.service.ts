import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
// import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";
import { IVendor } from "@models/vendor.interface";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ListingItem } from "@models/listingitem.interface";

@Injectable({
    providedIn: "root",
})
export class DbServiceService {
    constructor(public store: AngularFirestore) {}

    getMyListings(address = null) {
        if (address) {
            return this.store
                .collection<IVendor>("vendors", (ref) => ref.where("address", "==", address))
                .valueChanges({ idField: "id" });
        } else {
            return this.store.collection<IVendor>("vendors").valueChanges({ idField: "id" });
        }
    }

    public getVendorById(id: string) {
        return this.store.doc("vendors/" + id).get();
    }

    public getVendorListings(vendor: string): Observable<Array<any>> {
        return this.store.collection("listings", (ref) => ref.where("vendor", "==", `${vendor}`).where("published", "==", true)).valueChanges();
    }

    public getListings(published = true): Observable<Array<any>> {
        return this.store.collection("listings", (ref) => ref.where("published", "==", published)).valueChanges({ idField: "id" });
    }

    public getListingById(id: string): Observable<ListingItem | any> {
        return this.store.doc("listings/" + id).get();
    }
}
