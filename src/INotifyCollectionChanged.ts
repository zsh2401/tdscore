import DSEvent, { EventArgs } from "./DSEvent";
export type Action = "add" | "remove" | "other";
export class CollectionChangedEventArgs<E> extends EventArgs {
    action: Action;
    target?: E;
    constructor(action: Action, target?: E) {
        super();
        this.action = action;
        this.target = target;
    }
}
export default interface INotifyCollectionChanged<E> {
    readonly onCollectionChanged: DSEvent<CollectionChangedEventArgs<E>>;
}