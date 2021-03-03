import DSArray from "../../DSArray";
import ListBase from "./ListBase";
/**
 * Ungrowable and unextensiable ArrayList's implementation. 
 */
export default class UngrowableArrayList<E> extends ListBase<E>{

    protected array: DSArray<E>;
    protected length: number = 0;
    protected capcity: number = 0;

    /**
     * O(n)
     * @param maxSize 
     */
    constructor(maxSize: number = 100) {
        super();

        if (maxSize < 0) {
            maxSize = 0;
        }

        this.capcity = maxSize;
        this.array = new DSArray(this.capcity);
    }

    size(): number {
        return this.length;
    }
    listDelete(position: number): void {
        this.throwIfOutOfRange(position);
        for (let i = position; i < this.size() - 1; i++) {
            this.array.set(i, this.array.get(i + 1)!);
        }
        this.length--;
    }
    listInsert(position: number, element: E): void {
        this.throwIfOutOfRange(position);
        this.ensureCapcity();
        for (let i = this.size(); i > position; i--) {
            this.array.set(i, this.array.get(i - 1));
        }
        this.array.set(position, element);
        this.length++;
    }

    listGet(position: number): E {
        this.throwIfOutOfRange(position);
        return this.array[position];
    }

    private throwIfOutOfRange(position: number) {
        if (position < 0 || position >= this.size()) {
            throw new Error("Index out of bound!");
        }
    }
    protected ensureCapcity() {
        if (this.size() + 1 > this.capcity) {
            throw new Error("No more space");
        }
    }
    listSet(position: number, element: E): void {
        this.throwIfOutOfRange(position);
        this.ensureCapcity();
        this.array.set(position, element);
    }
    listAdd(element: E): void {
        this.ensureCapcity();
        this.array.set(this.size(), element);
        this.length++;
    }
    listClear(): void {
        this.array = new DSArray(this.capcity);
        this.length = 0;
    }
}