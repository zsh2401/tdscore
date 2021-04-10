import IIterable from "../IIterable";
import DSObject from "../../DSObject";
import { Func1 } from "../../Func";
import IIterator from "../IIterator";
import hashCode from "../../util/hashing";

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
        return new WhereIterator(this.source.getIterator(), this.predicate);
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
    getHashCode() {
        return super.getHashCode() ^ hashCode(this.source) ^ hashCode(this.predicate);
    }
    private shouldTakeFromCurrent = false;
    hasNext() {
        while (this.source.hasNext()) {
            const next = this.source.next();
            if (this.predicate(next)) {
                this.shouldTakeFromCurrent = true;
                return true;
            }
        }
        return false;
    }
    reset() {
        this.shouldTakeFromCurrent = false;
        this.source.reset();
    }
    current() {
        return this.source.current();
    }
    next() {
        let v;
        if (this.shouldTakeFromCurrent) {
            this.shouldTakeFromCurrent = false;
            v = this.source.current();
        } else {
            if (this.hasNext()) {
                this.shouldTakeFromCurrent = false;
                const v = this.source.next();
                if (this.predicate(v)) {
                    return v;
                }
            }
            throw new Error();
        }
        return v;
    }
}