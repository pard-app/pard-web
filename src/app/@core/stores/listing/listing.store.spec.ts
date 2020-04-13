import { TestBed } from "@angular/core/testing";

import { ListingStore } from "./listing.store";

describe("ListingStore", () => {
    let service: ListingStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ListingStore);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
