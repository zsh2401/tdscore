/*
 * avg.ts
 * Created on Sat Apr 10 2021 12:27:09
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

import IIterable from "../IIterable";

/**
 * Get average result of all elements in collection.
 * @param i 
 * @param add 
 * @param divByNumber 
 * @returns 
 */
export default function avg<E>(i: IIterable<E>,
    add: (a: E, b: E) => E,
    divByNumber: (a: E, b: number) => E) {

    const iterator = i.getIterator()
    if (iterator.hasNext() === false) {
        throw new Error("There's no any element")
    }
    let result = iterator.next()
    let len = 1;
    while (iterator.hasNext()) {
        result = add(result, iterator.next())
        len++
    }
    return divByNumber(result, len);
}