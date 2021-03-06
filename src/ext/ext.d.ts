import IIterable from "../data-structure/IIterable";
import IIterator from "../data-structure/IIterator";
import DSArray from "../DSArray";
import DSNumber from "../DSNumber";
import { IHashCodeGettable } from "../util/hash";

//TODO test
export declare global {
    interface Array<T> extends IArrayLike<T>, IIterable<T> {
        getIterator(): IIterator<T>
        toDSArray(): DSArray<E>
    }
    interface Number extends IHashCodeGettable {
        toDSNumber(): DSNumber;
    }
    interface String extends IHashCodeGettable {
        toDSNumber(): DSNumber;
    }
    interface Boolean extends IHashCodeGettable{

    }
}