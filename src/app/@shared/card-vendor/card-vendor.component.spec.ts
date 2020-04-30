import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CardVendorComponent } from "./card-vendor.component";

describe("CardVendorComponent", () => {
    let component: CardVendorComponent;
    let fixture: ComponentFixture<CardVendorComponent>;
    const vendor = {
        address: "str",
        bank: "someItem",
        city: "someItem",
        company: "someItem",
        country: "someItem",
        description: "someItem",
        email: "someItem",
        image: "someItem",
        phone: "someItem",
        registered: "someItem",
        regno: "someItem",
        delivery: true,
        delivery_costs: 123,
        delivery_note: "someItem",
        title: "someItem",
        objectID: "someItem",
        _geoloc: {
            lat: 123,
            lng: 123,
        },
        listings: [],
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CardVendorComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardVendorComponent);
        component = fixture.componentInstance;
        component.item = vendor;

        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
