import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Geoloc } from "places.js";
import { geoLocStr, noPagesLeft } from ".";

describe("Util Geo loc", () => {
    it("Should return a string", () => {
        expect(
            geoLocStr({
                lat: 111.131,
                lng: 232.111,
            })
        ).toEqual("111.131, 232.111");
        expect(
            geoLocStr({
                lat: 1,
                lng: 1,
            })
        ).toEqual("1, 1");
    });

    it("Should return undefined if empty string", () => {
        expect(geoLocStr(undefined as Geoloc)).toEqual(undefined);
    });
});

describe("NoPagesLeft function", () => {
    it("Should return a correct boolean", () => {
        // no pages left
        expect(noPagesLeft(0, 1)).toBe(true);
        expect(noPagesLeft(1, 2)).toBe(true);
        expect(noPagesLeft(4, 5)).toBe(true);
        // pages left
        expect(noPagesLeft(0, 2)).toBe(false);
        expect(noPagesLeft(1, 3)).toBe(false);
    });
});
