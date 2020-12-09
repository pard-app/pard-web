import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { LandingComponent } from "./landing.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";

describe("LandingComponent", () => {
    let component: LandingComponent;
    let fixture: ComponentFixture<LandingComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LandingComponent],
            imports: [RouterTestingModule, HttpClientModule, TranslateModule.forRoot()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
