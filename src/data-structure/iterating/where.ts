import IIterable from "../IIterable";
import DSObject from "../../DSObject";
import { Func1 } from "../../Func";
import IIterator from "../IIterator";
import hashCode from "../../util/hashing";
import getIterator from "./getIterator";

/**
 * 
 * You can understand this function as Array.filter with lazy load.
 * 
 * THIS IS ANOTHER LAZY LOAD ITERATING FUNCTION
 * 
 * @param i 
 * @param predicate 
 * @returns 
 */
export default function where<E>(i: IIterable<E>, predicate: Func1<E, boolean>): IIterable<E> {
    return new WhereIterable(i, predicate);
}

class WhereIterable<E> extends DSObject implements IIterable<E> {
    private readonly predicate: Func1<E, boolean>;
    private readonly source: IIterable<E>;
    constructor(source: IIterable<E>, predicate: Func1<E, boolean>) {
        super();
        this.predicate = predicate;
        this.source = source;
    }
    getIterator(): IIterator<E> {
        return new WhereIterator(getIterator<E>(this.source), this.predicate);
    }
}

class WhereIterator<E> extends DSObject implements IIterator<E>{

    private readonly source: IIterator<E>;
    private readonly predicate: Func1<E, boolean>;

    constructor(source: IIterator<E>, predicate: Func1<E, boolean>) {
        super();
        this.source = source;
        this.predicate = predicate;
    }

    private available: boolean = false;
    private moveToNextAvailable(): boolean {
        while (this.source.hasNext()) {
            const element = this.source.next()
            if (this.predicate(element)) {
                this.available = true
                return true
            }
        }
        return false
    }

    hasNext() {
        if (this.available === false) {
            this.available = this.moveToNextAvailable()
        }
        return this.available
    }

    reset() {
        this.available = false
        this.source.reset();
    }

    current() {
        if (this.available) {
            return this.source.current();
        } else {
            throw new Error("There's no current element.")
        }
    }

    next(): E {
        if (this.available === false) {
            this.available = this.moveToNextAvailable()
        }
        if (this.available === false) {
            throw new Error("There's no more element!")
        }
        this.available = false;
        return this.source.current()
    }
}