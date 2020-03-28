import { BehaviorSubject, Observable, Subscription } from "rxjs";

export function convertObservableToBehaviorSubject<T>(observable: Observable<T>, initValue: T): BehaviorSubject<T> {
    const subject = new BehaviorSubject(initValue);

    const subscription: Subscription = observable.subscribe({
        complete: () => subject.complete(),
        error: x => subject.error(x),
        next: x => {
            subscription.unsubscribe();
            subject.next(x);
        }
    });

    return subject;
}
