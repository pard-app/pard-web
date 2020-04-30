import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MainListComponent } from "./main-list.component";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("MainListComponent", () => {
    let component: MainListComponent;
    let fixture: ComponentFixture<MainListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainListComponent],
            imports: [RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
