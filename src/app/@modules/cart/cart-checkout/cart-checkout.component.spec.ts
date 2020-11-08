import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CartCheckoutComponent } from "./cart-checkout.component";
import { FormBuilder } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { AngularFireFunctionsModule } from "@angular/fire/functions";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { TranslateModule } from "@ngx-translate/core";
import { NbDialogModule, NbDialogService } from "@nebular/theme";
import { InjectionToken } from "@angular/core";

// describe("CartCheckoutComponent", () => {
//     let component: CartCheckoutComponent;
//     let fixture: ComponentFixture<CartCheckoutComponent>;
// });
