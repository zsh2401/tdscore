import HashSet from "./data-structure/HashSet";
import ISet from "./data-structure/ISet";
import DSObject from "./DSObject";

export interface Handler<TArgs, TReturn> {
    (sender: any, args: TArgs): TReturn;
}

export class EventArgs extends DSObject {

}

export default class DSEvent<A = EventArgs, R = void> extends DSObject {

    private readonly set: ISet<Handler<A, R>>;

    constructor() {
        super();
        this.set = new HashSet();
    }

    raise(sender: any, args: A) {
        this.set.forEach((handler: Handler<A, R>) => {
            handler(sender, args);
        });
    }

    add(handler: Handler<A, R>) {
        this.set.setAdd(handler);
    }

    remove(handler: Handler<A, R>) {
        this.set.setRemove(handler);
    }

    clear() {
        this.set.clear();
    }

}