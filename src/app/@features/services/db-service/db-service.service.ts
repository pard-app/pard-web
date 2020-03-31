import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentSnapshot, DocumentData } from "@angular/fire/firestore";
// import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
    providedIn: "root"
})
export class DbServiceService {
    constructor(public store: AngularFirestore) {}
    // ##########################################
    // ##### ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ######
    // ##### O N L Y - P O S T - R E Q ' S ######
    // ##### ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ######
    // ##########################################
}
