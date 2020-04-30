import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OnlyListingComponent } from "./only-listing.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("OnlyListingComponent", () => {
    let component: OnlyListingComponent;
    let fixture: ComponentFixture<OnlyListingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OnlyListingComponent],
            imports: [RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OnlyListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
