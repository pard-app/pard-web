import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { PrivacyPolicyComponent } from "./privacy-policy.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

describe("PrivacyPolicyComponent", () => {
    let component: PrivacyPolicyComponent;
    let fixture: ComponentFixture<PrivacyPolicyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PrivacyPolicyComponent],
            imports: [TranslateModule.forRoot()],
            providers: [TranslateService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrivacyPolicyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
