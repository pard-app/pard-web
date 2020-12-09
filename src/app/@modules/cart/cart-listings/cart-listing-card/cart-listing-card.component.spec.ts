import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { CartListingCardComponent } from "./cart-listing-card.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CartItem } from "@models/listingitem.interface";

describe("CartListingCardComponent", () => {
    let component: CartListingCardComponent;
    let fixture: ComponentFixture<CartListingCardComponent>;
    const cartItem: CartItem = {
        item: {
            description: "some value here",
            image: "some value here",
            price: 123,
            sold: false,
            stock: 234,
            title: "some value here",
            objectID: "some value here",
            vendor: "some value here",
            published: true,
            date: 112312321,
            quantity: 1,
        },
        quantity: 1,
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CartListingCardComponent],
            imports: [TranslateModule.forRoot()],
            providers: [TranslateService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartListingCardComponent);
        component = fixture.componentInstance;
        component.cartItem = { key: "asdsada", value: cartItem };
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
