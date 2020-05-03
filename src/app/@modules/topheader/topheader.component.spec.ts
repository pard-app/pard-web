import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TopheaderComponent } from "./topheader.component";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";

describe("TopheaderComponent", () => {
    let component: TopheaderComponent;
    let fixture: ComponentFixture<TopheaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopheaderComponent],
            imports: [RouterTestingModule, TranslateModule.forRoot()],
            providers: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopheaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
