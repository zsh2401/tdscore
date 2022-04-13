import IIterable from "../data-structure/IIterable"
import IIterator from "../data-structure/IIterator"
import DSObject from "../DSObject";
import IArrayLike, { toESArray } from "../IArrayLike";
import getIterator from "./getIterator";
import { isArrayLike } from "../util/type/determine-type";
import UIterable, { isUIterable } from "../data-structure/UIterable";
import forEach from "./forEach";
import { iteratorOf } from ".";

type Appendable<E> = UIterable<E> | E | IArrayLike<E>;
/**
 * Append element to a new Iterable object.
 * 
 * THIS IS ANOTHER LAZY LOAD ITERATING FUNCTION
 * 
 * @param i iterable object.
 * @param e new element.
 * @returns new iterable object which element has been append to it.
 */
export default function append<E>(...all: Appendable<E>[]): IIterable<E> {
    return new AppendIterable(all);
}

class AppendIterable<E> extends DSObject implements IIterable<E>{

    private readonly all: Appendable<E>[];
    constructor(all: Appendable<E>[]) {
        super();
        this.all = all;
    }

    getIterator(): IIterator<E> {
        const iterators = this.all.map(iteratorOf)
        return new AppendIterator(iterators);
    }
}
class AppendIterator<E> extends DSObject implements IIterator<E>{

    private readonly interators: IArrayLike<IIterator<E>>;
    private stage: number;

    constructor(interators: IArrayLike<IIterator<E>>) {
        super();
        this.interators = interators;
        this.stage = 0;
    }

    reset() {
        forEach(this.interators, (i) => i.reset());
        this.stage = 0;
    }

    hasNext() {
        while (this.stage < this.interators.length) {
            if (this.interators[this.stage].hasNext()) {
                return true;
            }
            this.stage++;
        }
        return false;
    }

    next() {
        while (this.stage < this.interators.length) {
            if (this.interators[this.stage].hasNext()) {
                return this.interators[this.stage].next();
            }
            this.stage++;
        }
        throw new Error("Can not iterate.")
    }

    current() {
        return this.interators[this.stage].current();
    }
}