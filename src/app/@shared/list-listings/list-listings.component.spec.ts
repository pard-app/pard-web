import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ListListingsComponent } from "./list-listings.component";

describe("ListListingsComponent", () => {
    let component: ListListingsComponent;
    let fixture: ComponentFixture<ListListingsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ListListingsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListListingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
