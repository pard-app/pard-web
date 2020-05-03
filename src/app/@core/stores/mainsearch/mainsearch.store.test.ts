import { TestBed } from "@angular/core/testing";

import { MainSearchStore } from "./mainsearch.store";

describe("Global.StoreService", () => {
    let service: MainSearchStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MainSearchStore);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
