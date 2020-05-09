import { TestBed } from "@angular/core/testing";

import { MainSearchStore, SearchRequest } from "./mainsearch.store";
import { ILocation } from "@models/location.interface";

describe("Main Search Store", () => {
    let service: MainSearchStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MainSearchStore);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    describe("SearchRequest Manipulation", () => {
        it("Should start with an empty SearchRequest", (done: DoneFn) => {
            service.searchRequest$.subscribe((x) => {
                expect(x).toEqual(new SearchRequest());
                done();
            });
        });

        it("Should construct listingOrVendor correctly", (done: DoneFn) => {
            service.searchChange({ listingOrVendor: "testValue" });
            service.searchRequest$.subscribe((x) => {
                expect(x).toEqual({ listingOrVendor: "testValue", location: null });
                done();
            });
        });

        it("Should construct listingOrVendor correctly", (done: DoneFn) => {
            service.searchChange({ location: { objectID: "a", _geoloc: { lat: 123, lng: 123 }, name: "a", county: "a", administrative: "a" } });
            service.searchRequest$.subscribe((x) => {
                expect(x).toEqual({
                    listingOrVendor: null,
                    location: { objectID: "a", _geoloc: { lat: 123, lng: 123 }, name: "a", county: "a", administrative: "a" },
                });
                done();
            });
        });
    });
});
