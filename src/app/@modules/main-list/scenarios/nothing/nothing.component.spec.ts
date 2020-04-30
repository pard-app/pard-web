import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NothingComponent } from "./nothing.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe("NothingComponent", () => {
    let component: NothingComponent;
    let fixture: ComponentFixture<NothingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NothingComponent],
            imports: [RouterTestingModule, HttpClientModule],
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
