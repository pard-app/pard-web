import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { NothingComponent } from "./nothing.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";

describe("NothingComponent", () => {
    let component: NothingComponent;
    let fixture: ComponentFixture<NothingComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NothingComponent],
            imports: [RouterTestingModule, HttpClientModule, TranslateModule.forRoot()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NothingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
