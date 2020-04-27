import { Hit } from "places.js";
import { ILocation } from "@models/location.interface";
import { removeUndefinedObjectValues } from "@utils/index";

export const mapHitToLocation = ({
    country: { en, default: defaultCountry },
    importance,
    county: { default: defaultCounty },
    population,
    country_code,
    administrative,
    locale_names: { en: defaultLocaleNamesEn, default: defaultLocaleNames },
    _geoloc,
    objectID,
    _highlightResult: {
        country: { en: highlightedCountryEn = {}, default: highlightedDefaultCountry = {} } = {},
        county: { default: highlightedCounty = {} } = {},
        administrative: highlightedAdministrative = {},
        locale_names: { en: highlightedLocaleNamesEn = {}, default: highlightedLocaleNamesDefault = {} } = {},
    } = {},
}: Hit | any): ILocation =>
    removeUndefinedObjectValues({
        objectID,
        _geoloc: Array.isArray(_geoloc) ? _geoloc[0] : _geoloc,
        name: defaultLocaleNames[0],
        county: defaultCounty[0],
        administrative: administrative[0],
        highlightedName: highlightedLocaleNamesDefault[0]?.value,
        highlightedCounty: highlightedCounty[0]?.value,
        highlightedAdministrative: highlightedAdministrative[0]?.value,
    });

export const mapHitsToLocations = (hits): ILocation[] => hits.map((hit) => hit && mapHitToLocation(hit));
// {
//     country: {
//         en: "Lithuania",
//         default: "Lietuva",
//     },
//     is_country: false,
//     is_highway: false,
//     importance: 15,
//     _tags: ["capital", "boundary/administrative", "city", "place/city", "country/lt", "source/geonames"],
//     postcode: [],
//     county: { default: ["Vilniaus m. sav."] },
//     population: 526356,
//     country_code: "lt",
//     is_city: true,
//     is_popular: true,
//     administrative: ["Vilniaus apskritis", "Vilniaus miesto savivaldybė"],
//     admin_level: 2,
//     is_suburb: false,
//     locale_names: {
//         en: ["Vilnius"],
//         default: ["Vilnius", "Vilna"],
//     },
//     _geoloc: { lat: 54.687, lng: 25.2829 },
//     objectID: "593116",
//     _highlightResult: {
//         country: {
//             en: { value: "Lithuania", matchLevel: "none", matchedWords: [] },
//             default: { value: "Lietuva", matchLevel: "none", matchedWords: [] },
//         },
//         postcode: [],
//         county: { default: [{ value: "<em>V</em>ilniaus m. sav.", matchLevel: "full", fullyHighlighted: false, matchedWords: ["v"] }] },
//         administrative: [
//             { value: "<em>V</em>ilniaus apskritis", matchLevel: "full", fullyHighlighted: false, matchedWords: ["v"] },
//             { value: "<em>V</em>ilniaus miesto savivaldybė", matchLevel: "full", fullyHighlighted: false, matchedWords: ["v"] },
//         ],
//         locale_names: {
//             en: [{ value: "<em>V</em>ilnius", matchLevel: "full", fullyHighlighted: false, matchedWords: ["v"] }],
//             default: [
//                 { value: "<em>V</em>ilnius", matchLevel: "full", fullyHighlighted: false, matchedWords: ["v"] },
//                 { value: "<em>V</em>ilna", matchLevel: "full", fullyHighlighted: false, matchedWords: ["v"] },
//             ],
//         },
//     },
// }
