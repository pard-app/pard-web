import { TestBed } from "@angular/core/testing";
import { ILocation } from "@models/location.interface";
import { CartStoreService } from "./cart.store.service";

describe("Cart.StoreService", () => {
    const mockItem = {
        sold: false,
        date: 1587799019962,
        description: "Tradicinės lino kelnės, siuvamos pagal užsakymą.",
        image:
            "https://firebasestorage.googleapis.com/v0/b/pard-app.appspot.com/o/listings%2FuetPOHBLY8U5HOW38wLGSYUv2982%2F38e7c90e-2700-4bb5-92a3-b520dba51d3a_500x500?alt=media&token=7e685efd-3b28-40ec-adf9-75b1e8ad0c55",
        price: 22,
        published: true,
        stock: 10,
        title: "Lininės kelnės",
        vendor: "testVendor12312312312312",
        _geoloc: { lat: 54.69235029999999, lng: 25.281753 },
        objectID: "testObjectId12312312312312",
        _highlightResult: {
            date: { value: "1587799019962", matchLevel: "none", matchedWords: [] },
            description: { value: "Tradicinės lino kelnės, siuvamos pagal užsakymą.", matchLevel: "none", matchedWords: [] },
            price: { value: "22", matchLevel: "none", matchedWords: [] },
            title: { value: "Lininės kelnės", matchLevel: "none", matchedWords: [] },
            vendor: { value: "uetPOHBLY8U5HOW38wLGSYUv2982", matchLevel: "none", matchedWords: [] },
        },
    };

    let service: CartStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CartStoreService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("Cart Items Manipulation", () => {
        it("ResetCart() Should reset cart items correctly", (done: DoneFn) => {
            service.addItemToCart(mockItem);
            expect(service.cartItemsLength).toBe(1);
            service.resetCart();
            expect(service.get("cartItems")).toEqual({});
            done();
        });
    });
});
