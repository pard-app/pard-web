import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";
import { IVendor } from "@models/vendor.interface";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class DbServiceService {
    constructor(public auth: AngularFireAuth, public store: AngularFirestore, public storage: AngularFireStorage) {}
    getMyListings() {
        return this.store
            .collection<IVendor>("vendors", ref => ref.where("vendor", "==", `${this.auth.auth.currentUser.uid}`))
            .valueChanges({ idField: "id" });
    }
}
