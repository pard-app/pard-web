import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { MainListComponent } from "./main-list.component";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("MainListComponent", () => {
    let component: MainListComponent;
    let fixture: ComponentFixture<MainListComponent>;

    beforeEach(waitForAsync(() => {
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
