/*
 * kmp.ts
 * Created on Sun Apr 11 2021 12:44:07
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
 */

import { ArrayList, LinkedList } from "../../data-structure";
import DSArray from "../../DSArray";
import IArrayLike from "../../IArrayLike";

/**
 * KMP algorithm
 * @param master 
 * @param child 
 * @param equator 
 * @returns 
 */
export default function <E>(master: IArrayLike<E>, child: IArrayLike<E>,
    equator: (a: E, b: E) => boolean): number {

    const next = getNext(child, equator)
    let i = 0;
    let j = 0;
    while (i < master.length && j < child.length) {
        if (j == -1 || equator(master[i], child[j])) {
            i++
            j++
        } else {
            j = next[i]
        }
    }
    if (j = child.length) {
        return i - j
    } else {
        return -1
    }
}
function getNext<E>(

    child: IArrayLike<E>,
    equator: (a: E, b: E) => boolean

): IArrayLike<number> {

    // const result = new DSArray<number>(child.length)
    // const left = new ArrayList(child.length / 2 > 128 ? 128 : child.length)
    // const right = new ArrayList(child.length / 2 > 128 ? 128 : child.length)

    // let i = 0;
    // while(){}
    // return result
    return []
}