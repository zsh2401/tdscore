import DSArray from "../DSArray";
import DSObject from "../DSObject";
import hashCode from "../util/hash";
import contains from "./iterating/contains"
import isEmpty from "./iterating/isEmpty"
import size from "./iterating/size"
import IIterator from "./IIterator";
import ICollection from "./ICollection";
import IClonable from "./IClonable";
import { Action1 } from "../Action";
import toDSArray from "./iterating/toDSArray";
import forEach from "./iterating/forEach"
import { Func1 } from "../Func";

export default abstract class CollectionBase<E>
    extends DSObject implements ICollection<E>, IClonable<ICollection<E>>{
    constructor() {
        super();
    }
    forEach(consumer: Action1<E>) {
        forEach(this, consumer);
    }
    map<T>(mapper: Func1<E, T>): DSArray<T> {
        return toDSArray(this, mapper);
    }
    clone(): ICollection<E> {
        throw new Error("Method not implemented.");
    }
    collectionIsEmpty(): boolean {
        return this.collectionSize() === 0;
    }

    collectionContains(e: E): boolean {
        const i = this.getIterator();
        const h = hashCode(e);
        while (i.hasNext()) {
            if (h === hashCode(i.next())) {
                return true;
            }
        }
        return false;
    }

    collectionToArray(): DSArray<E> {
        const a = new DSArray<E>(this.size());
        const iterator = this.getIterator();
        for (let i = 0; i < this.size(); i++) {
            a[i] = iterator.next();
        }
        return a;
    }

    collectionToJSArray(): E[] {
        const i = this.getIterator();
        const v: E[] = [];
        while (i.hasNext()) {
            v.push(i.next());
        }
        return v;
    }
    collectionIsReadOnly(): boolean {
        return false;
    }
    collectionSize(): number {
        return this.size();
    }
    toJSArray(): E[] {
        return this.collectionToJSArray();
    }

    collectionAny(): E {
        const i = this.getIterator();
        if (i.hasNext()) {
            return i.next();
        } else {
            throw new Error("This collection contains no element.");
        }
    }

    abstract collectionAdd(e: E): void;
    abstract collectionRemove(e: E): boolean;
    abstract collectionClear(): void;

    clear(): void {
        this.collectionClear();
    }
    // clone():ICollection
    size(): number {
        return size(this);
    }
    contains(o: E): boolean {
        return contains(this, o);
    }
    abstract getIterator(): IIterator<E>;

    isEmpty(): boolean {
        return isEmpty(this);
    }

    toArray(): DSArray<E> {
        return this.toArray();
    }
}