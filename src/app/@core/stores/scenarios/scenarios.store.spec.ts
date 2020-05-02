import { TestBed } from "@angular/core/testing";

import { ScenariosStore } from "./scenarios.store";

describe("ScenariosStore", () => {
    let service: ScenariosStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ScenariosStore);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
