import { TestBed } from "@angular/core/testing";

import { DbService } from "./db-service.service";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";

// describe("DbService", () => {
//     let service: DbService;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireFunctionsModule],
//             providers: [],
//         });
//         service = TestBed.inject(DbService);
//     });

//     it("should be created", () => {
//         expect(service).toBeTruthy();
//     });
// });
