import ArgumentError from "../../ArgumentError";
import DSArray from "../../DSArray";
import ListBase from "./ListBase";
/**
 * Ungrowable and unextensiable ArrayList's implementation. 
 */
export default class UngrowableArrayList<E> extends ListBase<E>{

    protected array: DSArray<E>;
    protected length: number;
    protected capcity: number;

    /**
     * O(n)
     * @param maxSize 
     */
    constructor(maxSize?: number) {
        super();

        this.length = 0
        this.capcity = 0

        if (maxSize === undefined || maxSize < 0) {
            maxSize = 0;
        }

        this.capcity = maxSize;
        this.array = new DSArray(this.capcity);
    }

    listSize(): number {
        return this.length;
    }

    listDelete(position: number): void {
        if (!Number.isInteger(position)) {
            throw new ArgumentError("the argument position should be integer")
        }
        this.throwIfOutOfRange(position);
        for (let i = position; i < this.listSize() - 1; i++) {
            this.array[i] = this.array[i + 1]!;
        }
        this.length--;
    }

    listInsert(position: number, element: E): void {
        if (!Number.isInteger(position)) {
            throw new ArgumentError("the argument position should be integer")
        }
        this.ensureCapcity();
        for (let i = this.listSize(); i > position; i--) {
            this.array[i] =  this.array[i - 1];
        }
        this.array[position] = element;
        this.length++;
    }

    listGet(position: number): E {
        if (!Number.isInteger(position)) {
            throw new ArgumentError("the argument position should be integer")
        }
        this.throwIfOutOfRange(position);
        return this.array[position];
    }

    protected throwIfOutOfRange(position: number): void {
        if (position < 0 || position >= this.listSize()) {
            throw new Error("Index out of bound!" + position);
        }
    }

    protected ensureCapcity(): void {
        if (this.listSize() + 1 > this.capcity) {
            throw new Error("No more space");
        }
    }

    listSet(position: number, element: E): void {
        this.throwIfOutOfRange(position);
        // this.ensureCapcity();
        this.array[position] = element;
    }

    listAdd(element: E): void {
        this.ensureCapcity();
        this.array[this.listSize()] = element;
        this.length++;
    }
    listClear(): void {
        this.array = new DSArray(this.capcity);
        this.length = 0;
    }
}