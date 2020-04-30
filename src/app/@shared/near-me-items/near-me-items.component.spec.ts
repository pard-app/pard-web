import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NearMeItemsComponent } from "./near-me-items.component";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";

describe("NearMeItemsComponent", () => {
    let component: NearMeItemsComponent;
    let fixture: ComponentFixture<NearMeItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NearMeItemsComponent],
            imports: [TranslateModule.forRoot()],
            providers: [HttpClient, HttpHandler],
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
