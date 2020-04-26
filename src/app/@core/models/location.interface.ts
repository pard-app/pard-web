import { Geoloc } from "places.js";

export interface ILocationHighlightedItems {
    highlightedName?: string;
    highlightedCounty?: string;
    highlightedAdministrative?: string;
}
export interface ILocation extends ILocationHighlightedItems {
    objectID: string;
    _geoloc: Geoloc;
    name: string;
    county: string;
    administrative: string;
}
