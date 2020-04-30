import { TestBed } from "@angular/core/testing";

import { LocationStore } from "./location.store";
import { RouterTestingModule } from "@angular/router/testing";

describe("LocationStore", () => {
    let service: LocationStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        });
        service = TestBed.inject(LocationStore);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
