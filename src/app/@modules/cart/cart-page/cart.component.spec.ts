import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CartComponent } from "./cart.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

describe("CartComponent", () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CartComponent],
            imports: [RouterTestingModule, TranslateModule.forRoot()],
            providers: [TranslateService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
