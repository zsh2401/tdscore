/*
 * determine-type.ts
 * Created on Wed Mar 10 2021 19:09:44
 *
 * Description: 
 *   No description.
 *
 * Copyright (c) 2021 tdscore
 * 
 * Copyright (c) 2021 Seymour Zhang and all contributors of this project.
 * tdscore is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 * Mulan Permissive Software License，Version 2
 */

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
    return typeof e === "object" && e.constructor.name === "DSArray"
    // return e instanceof DSArray;
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