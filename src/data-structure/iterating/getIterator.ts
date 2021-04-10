import IIterable from "../IIterable";
import DSObject from "../../DSObject";
import IArrayLike from "../../IArrayLike";
import { isDSArray, isIterable, isJSArray } from "../../util/type";
import IIterator from "../IIterator";

export default function getIterator<E>(e: IIterable<E> | E[] | any): IIterator<E> {
    if (isJSArray<E>(e)) {
        return new ArrayLikeIterator(e);
    } else if (isDSArray<E>(e)) {
        return e.getIterator();
    } else if (isIterable<E>(e)) {
        return e.getIterator();
    } else {
        return getIterator([e])
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
        if(this.position + 1 >= this.target.length){
            throw new Error("There's no element!")
        }
        return this.target[++this.position];
    }
    current(): E {
        return this.target[this.position];
    }
}