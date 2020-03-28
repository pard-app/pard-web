import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VendorSummaryHeaderComponent } from "./vendor-summary-header.component";

describe("VendorSummaryHeaderComponent", () => {
    let component: VendorSummaryHeaderComponent;
    let fixture: ComponentFixture<VendorSummaryHeaderComponent>;

    beforeEach(async(() => {
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
