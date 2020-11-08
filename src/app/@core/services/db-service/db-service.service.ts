import { Injectable } from "@angular/core";
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
}
