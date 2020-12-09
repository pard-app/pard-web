import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { TopheaderComponent } from "./topheader.component";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { NbMenuModule, NbMenuService } from "@nebular/theme";

describe("TopheaderComponent", () => {
    let component: TopheaderComponent;
    let fixture: ComponentFixture<TopheaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TopheaderComponent],
            imports: [RouterTestingModule, TranslateModule.forRoot(), NbMenuModule],
            providers: [NbMenuService],
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
