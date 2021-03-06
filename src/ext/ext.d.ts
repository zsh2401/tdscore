import IIterable from "../data-structure/IIterable";
import IIterator from "../data-structure/IIterator";
import DSArray from "../DSArray";
import DSNumber from "../DSNumber";

//TODO test
export declare global {
    interface Array<T> extends IArrayLike<T>, IIterable<T> {
        getIterator(): IIterator<T>
        toDSArray(): DSArray<E>
    }
    interface Number {
        toDSNumber(): DSNumber;
    }
    interface String {
        toDSNumber(): DSNumber;
    }
}