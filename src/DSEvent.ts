import HashSet from "./data-structure/HashSet";
import ISet from "./data-structure/ISet";
import DSObject from "./DSObject";
import forEach from "./data-structure/iterating/forEach";

export interface Handler<TArgs, TReturn> {
    (sender: any, args: TArgs): TReturn;
}

export class EventArgs extends DSObject {

}

export default class DSEvent<A extends EventArgs = EventArgs, R = void> extends DSObject {

    private readonly set: ISet<Handler<A, R>>;
    constructor() {
        super();
        this.set = new HashSet();
    }

    raise(sender: any, args: A) {
        forEach(this.set, (handler: Handler<A, R>) => {
            handler(sender, args);
        });
    }

    add(handler: Handler<A, R>) {
        this.set.setAdd(handler);
    }

    remove(handler: Handler<A, R>) {
        this.set.setRemove(handler);
    }
}