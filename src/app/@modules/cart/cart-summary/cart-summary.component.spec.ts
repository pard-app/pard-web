import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CartSummaryComponent } from "./cart-summary.component";
import { TranslateModule, TranslateService, TranslateStore } from "@ngx-translate/core";

describe("CartSummaryComponent", () => {
    let component: CartSummaryComponent;
    let fixture: ComponentFixture<CartSummaryComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CartSummaryComponent],
            imports: [TranslateModule.forRoot()],
            providers: [TranslateService, TranslateStore],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
