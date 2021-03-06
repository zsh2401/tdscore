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

export default interface IArrayLike<T> {
    length: number;
    [index: number]: T;
}


export function toDSArray<E>(array: IArrayLike<E>): DSArray<E> {
    const result = new DSArray<E>(array.length);
    for (let i = 0; i < array.length; i++) {
        result[i] = array[i]
    }
    return result;
}


export function toJSArray<E>(array: IArrayLike<E>): E[] {
    const result: E[] = []
    for (let i = 0; i < array.length; i++) {
        result.push(array[i]);
    }
    return result;
}