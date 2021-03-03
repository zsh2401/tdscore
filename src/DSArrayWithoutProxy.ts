import DSObject from "./DSObject";
import IIterable from "./data-structure/IIterable";
import IIterator from "./data-structure/IIterator";
import find from "./data-structure/iterating/find"
import toJSArray from "./data-structure/iterating/toJSArray";
import hashCode from "./util/hash";
import DSArray from "./DSArray";

class DSArrayIterator<E> implements IIterator<E>{
    private position = -1;
    private array: DSArrayWithoutProxy<E>;
    constructor(array: DSArrayWithoutProxy<E>) {
        this.array = array;
    }
    reset(): void {
        this.position = -1;
    }
    hasNext(): boolean {
        const nextPosition = this.position + 1;
        const inRange = nextPosition < this.array.length && nextPosition >= 0;
        if (inRange) {
            return this.array.get(nextPosition) !== undefined;
        } else {
            return false;
        }
    }
    next(): E {
        return this.array[++this.position]!;
    }
    current(): E {
        return this.array[this.position]!;
    }
}

/**
 * Prepare for internal use.
 * Do not use this class when you're not ensure what you are doing.
 */
export default class DSArrayWithoutProxy<E> extends DSObject implements IIterable<E>{

    readonly length: number;

    constructor(size: number) {
        super();
        this.length = size;
    }

    getIterator(): IIterator<E> {
        return new DSArrayIterator(this);
    }

    [index: number]: E | undefined;

    readonly length: number;

    /**
     * 
     * @deprecated use indexer. e.g array[0]
     * @param index 
     */
    get(index: number): E | undefined {
        return this[index];
    }

    /**
     * 
     * @deprecated use indexer. e.g array[0]
     * @param index 
     * @param value 
     */
    set(index: number, value: E | undefined): void {
        this[index] = value;
    }

    contains(v: E): boolean {
        const h = hashCode(v);
        return find(this, (it) => hashCode(it) === h) !== null;
    }

    toJSArray(): E[] {
        return toJSArray(this);
    }

    static copy<E>(src: DSArray<E>, dest: DSArray<E>, start?: number, count?: number): void {
        start ??= 0;
        count ??= dest.length;
        for (let i = 0; i < count; i++) {
            dest[i] = src[start + i];
        }
    }

}