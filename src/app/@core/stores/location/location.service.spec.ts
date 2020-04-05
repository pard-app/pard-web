import { TestBed } from "@angular/core/testing";

import { LocationStore } from "./location.store";

describe("LocationStore", () => {
    let service: LocationStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocationStore);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
