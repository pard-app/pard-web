import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { TermsAndConditionsComponent } from "./terms-and-conditions.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

describe("TermsAndConditionsComponent", () => {
    let component: TermsAndConditionsComponent;
    let fixture: ComponentFixture<TermsAndConditionsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TermsAndConditionsComponent],
            imports: [TranslateModule.forRoot()],
            providers: [TranslateService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TermsAndConditionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
