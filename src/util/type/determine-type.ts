import DSObject from "../../DSObject";
import IIterable from "../../data-structure/IIterable";
import DSArray from "../../DSArray";
import IArrayLike from "../../IArrayLike";

export function isBoolean(e: any): e is boolean {
    return typeof e === "boolean";
}
export function isNumber(e: any): e is number {
    return typeof e === "number";
}
export function isString(e: any): e is string {
    return typeof e === "string";
}
export function isFunction(e: any): e is Function {
    return typeof e === "function";
}
export function isSymbol(e: any): e is Symbol {
    return typeof e === "symbol";
}
export function isBigint(e: any): e is bigint {
    return typeof e === "bigint"
}
export function isNull(e: any): e is null {
    return e === null;
}
export function isUndefined(e: any): e is undefined {
    return e === undefined;
}
export function isNullOrUndefined(e: any): e is (null | undefined) {
    return isNull(e) || isUndefined(e);
}
export function isDSObject<R extends DSObject = DSObject>(e: any): e is R {
    if (typeof e === "object") {
        let proto = e.__proto__;
        while (proto.constructor.name !== "Object") {
            if (proto.constructor.name === "DSObject") {
                return true;
            }
            proto = proto.__proto__;
        }
    }
    return false;
}
export function isDSArray<E>(e: any): e is DSArray<E> {
    return isDSObject(e) || e.getClassName() === "DSArray";
}
export function isArrayLike<E>(e: any): e is IArrayLike<E> {
    return isDSArray(e) || isJSArray(e);
}
export function isJSArray<E>(e: any): e is E[] {
    return Object.prototype.toString.call(e) == '[object Array]';
}
export function isIterable<E>(e: any): e is IIterable<E> {
    return typeof (<IIterable<E>>e).getIterator === "function";
}