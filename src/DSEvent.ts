import LinkedList from "./data-structure/linear/LinkedList";
import ICollection from "./data-structure/ICollection";
import DSObject from "./DSObject";
export interface Handler<TArgs, TReturn> {
    (sender: any, args: TArgs): TReturn;
}

export class EventArgs extends DSObject {

}

export default class DSEvent<A = EventArgs, R = void> extends DSObject {

    private readonly listeners: ICollection<Handler<A, R>>;

    constructor() {
        super();
        this.listeners = this.createListenersCollection();
    }

    protected createListenersCollection(): ICollection<Handler<A, R>> {
        return new LinkedList<Handler<A, R>>();
    }


    raise(sender: any, args: A) {
        this.listeners.forEach((handler: Handler<A, R>) => {
            handler(sender, args);
        });
    }

    add(handler: Handler<A, R>) {
        this.listeners.collectionAdd(handler);
    }

    remove(handler: Handler<A, R>) {
        this.listeners.collectionRemove(handler);
    }

    clear() {
        this.listeners.clear();
    }

}