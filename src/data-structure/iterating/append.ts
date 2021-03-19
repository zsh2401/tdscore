import IIterable from "../IIterable";
import IIterator from "../IIterator"
import DSObject from "../../DSObject";

/**
 * Append element to a new Iterable object.
 * @param i iterable object.
 * @param e new element.
 * @returns new iterable object which element has been append to it.
 */
export default function append<E>(i: IIterable<E>, e: E): IIterable<E> {
    return new AppendIterable(i, e);
}
class AppendIterable<E> extends DSObject implements IIterable<E>{
    private readonly source;
    private readonly newEle;
    constructor(iterable: IIterable<E>, newEle: E) {
        super();
        this.source = iterable;
        this.newEle = newEle;
    }

    getIterator(): IIterator<E> {
        return new AppendIterator(this.source.getIterator(), this.newEle);
    }
}
class AppendIterator<E> extends DSObject implements IIterator<E>{
    private readonly source;
    private readonly newEle;
    private newElementTook = false;
    constructor(source: IIterator<E>, newEle: E) {
        super();
        this.source = source;
        this.newEle = newEle;
    }
    reset() {
        this.source.reset();
        this.newElementTook = false;
    }
    hasNext() {
        if (this.source.hasNext() || !this.newElementTook) {
            return true;
        }
        return false;
    }
    next() {
        if (this.source.hasNext()) {
            return this.source.next();
        } else if (!this.newElementTook) {
            this.newElementTook = true;
            return this.newEle;
        }
        throw new Error("No element.");
    }
    current() {
        if (this.newElementTook) {
            return this.newEle;
        } else {
            return this.source.current()
        }
    }
}