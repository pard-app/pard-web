import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { VendorSingleListingViewComponent } from "./vendor-single-listing-view.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";

describe("VendorSingleListingViewComponent", () => {
    let component: VendorSingleListingViewComponent;
    let fixture: ComponentFixture<VendorSingleListingViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [VendorSingleListingViewComponent],
            imports: [RouterTestingModule, TranslateModule.forRoot()],
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
