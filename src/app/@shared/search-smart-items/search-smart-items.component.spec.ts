import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchSmartItemsComponent } from "./search-smart-items.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("SearchSmartItemsComponent", () => {
    let component: SearchSmartItemsComponent;
    let fixture: ComponentFixture<SearchSmartItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchSmartItemsComponent],
            imports: [RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchSmartItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
