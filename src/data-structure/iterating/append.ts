import IIterable from "../IIterable";
import IIterator from "../IIterator"
import DSObject from "../../DSObject";
import IArrayLike from "../../IArrayLike";
import getIterator from "./getIterator";
import { isArrayLike } from "../../util/type/determine-type";
import UIterable from "../UIterable";

/**
 * Append element to a new Iterable object.
 * 
 * THIS IS ANOTHER LAZY LOAD ITERATING FUNCTION
 * 
 * @param i iterable object.
 * @param e new element.
 * @returns new iterable object which element has been append to it.
 */
export default function append<E>(i: UIterable<E>, e: E | IArrayLike<E>): IIterable<E> {
    return new AppendIterable(i, isArrayLike(e) ? e : [e]);
}

class AppendIterable<E> extends DSObject implements IIterable<E>{
    private readonly source;
    private readonly newEle;
    constructor(iterable: UIterable<E>, newElements: IArrayLike<E>) {
        super();
        this.source = iterable;
        this.newEle = newElements;
    }

    getIterator(): IIterator<E> {
        return new AppendIterator(getIterator(this.source), getIterator(this.newEle));
    }
}
class AppendIterator<E> extends DSObject implements IIterator<E>{

    private readonly source: IIterator<E>;
    private readonly newElements: IIterator<E>;
    private stage: "source" | "new" = "source"

    constructor(source: IIterator<E>, newElements: IIterator<E>) {
        super();
        this.stage = source.hasNext() ? "source" : "new"
        this.source = source;
        this.newElements = newElements
    }

    reset() {
        this.source.reset();
        this.newElements.reset()
        this.stage = this.source.hasNext() ? "source" : "new"
    }

    hasNext() {
        return this.source.hasNext() || this.newElements.hasNext();
    }

    next() {
        if (this.stage === "source" && this.source.hasNext()) {
            return this.source.next();
        } else {
            this.stage = "new"
            return this.newElements.next()
        }
    }

    current() {
        return this.stage === "source" ?
            this.source.current() : this.newElements.current()
    }
}