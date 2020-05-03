import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Geoloc } from "places.js";

export function convertObservableToBehaviorSubject<T>(observable: Observable<T>, initValue: T): BehaviorSubject<T> {
    const subject = new BehaviorSubject(initValue);

    const subscription: Subscription = observable.subscribe({
        complete: () => subject.complete(),
        error: (x) => subject.error(x),
        next: (x) => {
            subscription.unsubscribe();
            subject.next(x);
        },
    });

    return subject;
}

export function geoLocStr(latLngObj: Geoloc): string | undefined {
    return !isObjectUndefinedOrEmpty(latLngObj) ? `${latLngObj.lat}, ${latLngObj.lng}` : undefined;
}

export const noPagesLeft = (currentPage: number, totalPages: number): boolean => {
    return currentPage === totalPages - 1 || currentPage === totalPages;
};

export const removeUndefinedObjectValues = (json) => {
    return JSON.parse(JSON.stringify(json));
};

export const isObjectUndefinedOrEmpty = (val: object) => !val || Object.entries(val).length === 0;
