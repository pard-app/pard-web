import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OnlyLocationComponent } from "./only-location.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";

describe("OnlyLocationComponent", () => {
    let component: OnlyLocationComponent;
    let fixture: ComponentFixture<OnlyLocationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OnlyLocationComponent],
            imports: [RouterTestingModule, TranslateModule.forRoot()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OnlyLocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
