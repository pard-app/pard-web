import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VendorSingleListingViewComponent } from "./vendor-single-listing-view.component";

describe("VendorSingleListingViewComponent", () => {
    let component: VendorSingleListingViewComponent;
    let fixture: ComponentFixture<VendorSingleListingViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VendorSingleListingViewComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VendorSingleListingViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
