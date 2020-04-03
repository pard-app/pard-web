import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentSnapshot, DocumentData } from "@angular/fire/firestore";
import { AngularFireFunctions } from "@angular/fire/functions";

@Injectable({
    providedIn: "root"
})
export class DbService {
    constructor(private functions: AngularFireFunctions) {}

    placeOrder(orders, buyer, delivery) {
        const callable = this.functions.httpsCallable("placeOrder");
        return callable({ orders, buyer, delivery }).toPromise();
    }
}
