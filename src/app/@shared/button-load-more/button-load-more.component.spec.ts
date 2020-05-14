import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ButtonLoadMoreComponent } from "./button-load-more.component";
import { TranslateModule } from "@ngx-translate/core";

describe("ButtonLoadMoreComponent", () => {
    let component: ButtonLoadMoreComponent;
    let fixture: ComponentFixture<ButtonLoadMoreComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonLoadMoreComponent],
            imports: [TranslateModule.forRoot()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonLoadMoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
