import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { SearchLocationComponent } from "./search-location.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";

describe("SearchLocationComponent", () => {
    let component: SearchLocationComponent;
    let fixture: ComponentFixture<SearchLocationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SearchLocationComponent],
            imports: [RouterTestingModule, TranslateModule.forRoot()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchLocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
