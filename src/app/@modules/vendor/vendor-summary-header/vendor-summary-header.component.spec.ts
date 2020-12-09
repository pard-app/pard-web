import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { VendorSummaryHeaderComponent } from "./vendor-summary-header.component";

describe("VendorSummaryHeaderComponent", () => {
    let component: VendorSummaryHeaderComponent;
    let fixture: ComponentFixture<VendorSummaryHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [VendorSummaryHeaderComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VendorSummaryHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
