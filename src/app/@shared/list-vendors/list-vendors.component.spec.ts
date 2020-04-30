import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ListVendorsComponent } from "./list-vendors.component";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("ListVendorsComponent", () => {
    let component: ListVendorsComponent;
    let fixture: ComponentFixture<ListVendorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListVendorsComponent],
            imports: [RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListVendorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
