import IList from "./IList";
import _forEach from "../../ixa/forEach"
import toDSArray from "../../ixa//toDSArrayForItertable"
import ListIterator from "./ListIterator";
import { Action1 } from "../../Action";
import IReadonlyList from "./IReadonlyList";
import DSArray from "../../DSArray";
import hashCode from "../../util/hashing";
import IStack from "./IStack";
import IQueue from "./IQueue";
import CollectionBase from "../CollectionBase";
import IListIterator from "./IListIterator";
import equals from "../../dsEquals";
import UIterable from "../UIterable";
import forEach from "../../ixa/forEach";

export default abstract class ListBase<E> extends CollectionBase<E>
    implements IStack<E>, IQueue<E>, IList<E>, IReadonlyList<E>{

    collectionClear(): void {
        this.listClear();
    }

    collectionAdd(e: E): void {
        this.listAdd(e);
    }

    collectionRemove(e: E): boolean {
        const i = this.listIndexOf(e);
        if (i !== -1) {
            this.listDelete(i);
        }
        return i !== -1;
    }

    collectionSize(): number {
        return this.listSize()
    }


    protected throwIfIndexOutOfBound(position: number): void {
        if (position < 0 || position >= this.listSize()) {
            throw new RangeError(`Index out of bound. ${position}`);
        }
    }

    protected hash(e: E): number {
        return hashCode(e);
    }

    queueGetHead(): E {
        return this.listGet(0);
    }

    queueEn(e: E): void {
        this.stackPush(e);
    }

    queueDe(): E {
        const v = this.listGet(0);
        this.listDelete(0);
        return v;
    }

    stackPush(e: E): void {
        this.listAdd(e);
    }

    stackPop(): E {
        const v = this.listGet(this.listSize() - 1);
        this.listDelete(this.listSize() - 1);
        return v;
    }

    stackGetTop(): E {
        return this.listGet(this.listSize() - 1);
    }

    toArray(): DSArray<E> {
        return toDSArray(this);
    }
    contains(value: E): boolean {
        return this.listIndexOf(value) !== -1;
    }

    listAddAll(elements: UIterable<E>): void {
        forEach(elements, (ele) => {
            this.listAdd(ele)
        })
    }

    abstract listDelete(position: number): void;

    abstract listInsert(position: number, element: E): void;

    abstract listGet(position: number): E;

    abstract listSet(position: number, element: E): void;

    abstract listAdd(element: E): void;

    abstract listClear(): void;

    abstract listSize(): number;

    listIndexOf(element: E): number {
        const iterator = this.getIterator();
        for (let i = 0; iterator.hasNext(); i++) {
            if (equals(element, iterator.next())) {
                return i;
            }
        }
        return -1;
    }

    listIsEmpty(): boolean {
        return this.listSize() === 0;
    }

    getIterator(): IListIterator<E> {
        return new ListIterator(this);
    }

    listForEach(consumer: Action1<E>): void {
        _forEach(this, consumer);
    }
}