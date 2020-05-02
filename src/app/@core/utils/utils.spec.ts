import { Geoloc } from "places.js";
import { geoLocStr, noPagesLeft, removeUndefinedObjectValues } from ".";

describe("Utilities", () => {
    describe("GeoLocStr()", () => {
        it("Should return correct values", () => {
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

        it("Should handle Edge Case values (null, undefined, {})", () => {
            expect(geoLocStr(undefined as Geoloc)).toEqual(undefined);
            expect(geoLocStr(null as Geoloc)).toEqual(undefined);
            expect(geoLocStr({} as Geoloc)).toEqual(undefined);
        });
    });

    describe("NoPagesLeft()", () => {
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

    describe("RemoveUndefinedObjectValues()", () => {
        it("Should return an object with only keys that have values", () => {
            // no pages left
            expect(
                removeUndefinedObjectValues({
                    a: undefined,
                    b: "value",
                    c: "value",
                    d: undefined,
                })
            ).toEqual({
                b: "value",
                c: "value",
            });

            expect(
                removeUndefinedObjectValues({
                    a: null,
                    b: "value",
                    c: "value",
                    d: null,
                })
            ).toEqual({
                a: null,
                b: "value",
                c: "value",
                d: null,
            });
        });
    });
});
