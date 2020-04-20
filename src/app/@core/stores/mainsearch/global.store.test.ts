import { TestBed } from "@angular/core/testing";

import { GlobalStoreService } from "./mainsearch.store";

describe("Global.StoreService", () => {
    let service: GlobalStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GlobalStoreService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
