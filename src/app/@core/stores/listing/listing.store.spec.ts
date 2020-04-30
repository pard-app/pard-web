import { TestBed } from "@angular/core/testing";

import { ListingStore } from "./listing.store";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("ListingStore", () => {
    let service: ListingStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        service = TestBed.inject(ListingStore);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
