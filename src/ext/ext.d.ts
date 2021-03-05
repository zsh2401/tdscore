import IIterable from "../data-structure/IIterable";
import IIterator from "../data-structure/IIterator";

export declare global {
    interface Array<T> extends IArrayLike<T>, IIterable<T> {
        getIterator(): IIterator<T>
    }
}