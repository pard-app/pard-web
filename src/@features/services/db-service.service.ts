import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
// import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";
import { IVendor } from "@models/vendor.interface";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class DbServiceService {
    constructor(public store: AngularFirestore) {}
    getMyListings() {
        return this.store.collection<IVendor>("vendors").valueChanges({ idField: "id" });
    }
}
