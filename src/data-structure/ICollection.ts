import { Action1 } from "../Action";
import DSArray from "../DSArray";
import DSObject from "../DSObject";
import { Func1 } from "../Func";
import IIterable from "./IIterable";

export default interface ICollection<E> extends DSObject, IIterable<E> {

    collectionIsReadOnly(): boolean;
    collectionAdd(e: E): void;
    collectionRemove(e: E): boolean;
    collectionClear(): void;
    collectionAny(): E;
    collectionSize(): number;
    collectionIsEmpty(): boolean;
    collectionContains(e: E): boolean;
    collectionToArray(): DSArray<E>;
    collectionToJSArray(): E[];

    forEach(consumer: Action1<E>): void;
    map<T>(consumer: Func1<E, T>): DSArray<T>;
    
    clear(): void;
    size(): number;
    isEmpty(): boolean;
    toArray(): DSArray<E>;
    toJSArray(): E[];
    contains(o: E): boolean;
}