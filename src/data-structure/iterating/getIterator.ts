import IIterable from "../IIterable";
import DSObject from "../../DSObject";
import IArrayLike from "../../IArrayLike";
import { isArrayLike, isDSArray, isESIterable, isIterable } from "../../util/type/determine-type";
import IIterator from "../IIterator";
import fromESIterator from "./fromESIterator";

/**
 * Get iterator for anything!
 * @param e 
 * @returns 
 */
export default function <E>(e: IIterable<E> | Iterable<E> | IArrayLike<E> | ArrayLike<E> | E): IIterator<E> {

    if (isIterable<E>(e) || isDSArray<E>(e)) {
        return e.getIterator();
    }
    else if (isArrayLike<E>(e)) {
        return new ArrayLikeIterator(e)
    }
    else if (isESIterable<E>(e)) {
        return fromESIterator(e).getIterator()
    } else {
        return fromESIterator([e]).getIterator()
    }

}
class ArrayLikeIterator<E>
    extends DSObject
    implements IIterator<E>
{
    private position: number = -1;
    private target: IArrayLike<E>;

    constructor(target: IArrayLike<E>) {
        super();
        this.target = target;
    }

    reset(): void {
        this.position = -1;
    }
    hasNext(): boolean {
        return this.position + 1 < this.target.length;
    }
    next(): E {
        if (this.position + 1 >= this.target.length) {
            throw new Error("There's no element!")
        }
        return this.target[++this.position];
    }
    current(): E {
        return this.target[this.position];
    }
}