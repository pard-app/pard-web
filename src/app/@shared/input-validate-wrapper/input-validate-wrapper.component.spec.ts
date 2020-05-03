import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InputValidateWrapperComponent } from "./input-validate-wrapper.component";
import { TranslateService, TranslateModule } from "@ngx-translate/core";

describe("InputValidateWrapperComponent", () => {
    let component: InputValidateWrapperComponent;
    let fixture: ComponentFixture<InputValidateWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InputValidateWrapperComponent],
            imports: [TranslateModule.forRoot()],
            providers: [TranslateService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputValidateWrapperComponent);
        component = fixture.componentInstance;
        component.ref = {
            invalid: false,
        };
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
