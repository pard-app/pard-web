import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { NearMeItemsComponent } from "./near-me-items.component";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";

describe("NearMeItemsComponent", () => {
    let component: NearMeItemsComponent;
    let fixture: ComponentFixture<NearMeItemsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NearMeItemsComponent],
            imports: [TranslateModule.forRoot(), HttpClientModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NearMeItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
