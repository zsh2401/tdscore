/*
 * IArrayLike.ts
 * Created on Sat Mar 06 2021 00:59:31
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

import DSArray from "./DSArray";
import { isJSArray } from "./util/type/determine-type";

export default interface IArrayLike<T> {
    length: number;
    [index: number]: T;
}

export function copyTo<E>(src: IArrayLike<E>, dest: IArrayLike<E>, start?: number, length?: number) {
    start ??= 0;
    length ??= src.length;
    const destLength = isJSArray(dest) ? Number.POSITIVE_INFINITY : dest.length;
    for (let i = start; i < start + length && i <= destLength; i++) {
        dest[i - start] = src[i];
    }
}
export function clone<E>(src: IArrayLike<E>): IArrayLike<E> {
    const dest = new DSArray<E>(src.length);
    copyTo(src, dest, 0, dest.length);
    return dest;
}
export function toDSArray<E>(array: IArrayLike<E>, alwaysNew: boolean = false): DSArray<E> {
    if (!alwaysNew && array instanceof DSArray) {
        return array;
    }
    const result = new DSArray<E>(array.length);
    for (let i = 0; i < array.length; i++) {
        result[i] = array[i]
    }
    return result;
}
export function toJSArray<E>(array: IArrayLike<E>, alwaysNew: boolean = false): E[] {
    if (!alwaysNew && array instanceof Array) {
        return array;
    }
    const result: E[] = []
    for (let i = 0; i < array.length; i++) {
        result.push(array[i]);
    }
    return result;
}

export function toESArray<E>(array: IArrayLike<E>): E[] {
    return toJSArray(array);
}