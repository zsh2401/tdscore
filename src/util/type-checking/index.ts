import IIterable from "../../data-structure/IIterable";

export function isJSArray<E>(e: any): e is E[] {
    return Object.prototype.toString.call(e) == '[object Array]';
}
export function isIterable<E>(e: any): e is IIterable<E> {
    return (<IIterable<E>>e).getIterator !== undefined;
}