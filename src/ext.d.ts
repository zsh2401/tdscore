import IIterable from "./data-structure/IIterable";
import IIterator from "./data-structure/IIterator";
import DSArray from "./DSArray";
import DSNumber from "./DSNumber";
import { IHashCodeGettable } from "./util/hash";

//TODO test
export declare global {


    interface Array<T> extends IHashCodeGettable, IArrayLike<T>, IIterable<T> {
        getIterator(): IIterator<T>;
        toDSArray(): DSArray<E>;
        remove(item: E): void;
        indexOf(item: E): number;
    }
    interface Number extends IHashCodeGettable {
        toDSNumber(): DSNumber;
    }
    interface String extends IHashCodeGettable {
        toDSNumber(): DSNumber;
    }
    interface Boolean extends IHashCodeGettable {
        toDSNumber(): DSNumber;
    }

    interface ObjectConstructor {
        dsHashCodeOf(o: any);
        dsEquals(a: any, b: any);
    }

}