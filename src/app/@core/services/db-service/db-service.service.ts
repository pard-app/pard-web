import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentSnapshot, DocumentData } from "@angular/fire/firestore";
import { AngularFireFunctions } from "@angular/fire/functions";

@Injectable({
    providedIn: "root",
})
export class DbService {
    constructor(private functions: AngularFireFunctions) {}

    placeOrder(orders, buyer, delivery, invoice, captcha) {
        const callable = this.functions.httpsCallable("placeOrder");
        return callable({ orders, buyer, delivery, invoice, captcha }).toPromise();
    }

    updateOrderPaymentStatus({ id, paymentStatus }) {
        const callable = this.functions.httpsCallable("updateOrderPaymentStatus");
        return callable({ id, paymentStatus }).toPromise();
    }
}
