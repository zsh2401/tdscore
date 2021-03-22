import DSArray from "../DSArray"
import DSObject from "../DSObject"
import contains from "./iterating/contains"
import size from "./iterating/size"
import IIterator from "./IIterator"
import ICollection from "./ICollection"
import IClonable from "./IClonable"
import { Action1 } from "../Action"
import toDSArray from "./iterating/toDSArrayForItertable"
import forEach from "./iterating/forEach"
import { Func1 } from "../Func"
import dsEquals from "../dsEquals"

export default abstract class CollectionBase<E>
    extends DSObject implements ICollection<E>, IClonable<ICollection<E>>{

    constructor() {
        super();
    }

    abstract collectionAdd(e: E): void;
    abstract collectionRemove(e: E): boolean;
    abstract collectionClear(): void;

    forEach(consumer: Action1<E>) {
        forEach(this, consumer);
    }

    map<T>(mapper: Func1<E, T>): DSArray<T> {
        return toDSArray(this, mapper);
    }

    clone(): ICollection<E> {
        throw new Error("This method has not been implemented now because of cycle dependency");
        // const target = new ArrayList<E>(this.size());
        // const iterator = this.getIterator();
        // while (iterator.hasNext()) {
        //     target.listAdd(iterator.next());
        // }
        // return target;
    }

    collectionIsEmpty(): boolean {
        return this.collectionSize() === 0;
    }

    collectionContains(e: E): boolean {
        const i = this.getIterator();
        while (i.hasNext()) {
            if (dsEquals(i.next(), e)) {
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

    clear(): void {
        this.collectionClear();
    }

    size(): number {
        return size(this);
    }
    contains(o: E): boolean {
        return contains(this, o);
    }

    abstract getIterator(): IIterator<E>;

    isEmpty(): boolean {
        return this.collectionIsEmpty()
    }

    toArray(): DSArray<E> {
        return this.collectionToArray()
    }
}