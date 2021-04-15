import IIterable from "../IIterable";
import getIterator from "./getIterator";

/*
 * sum.ts
 * Created on Sat Apr 10 2021 12:23:45
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

/**
 * 
 * Get the summation of all elements in collection.
 * 
 * @param i 
 * @param adder 
 * @returns 
 */
export default function <E>(i: IIterable<E>, adder: (a: E, b: E) => E, initialValue?: E): E {
    const iterator = getIterator<E>(i)
    if (initialValue === undefined && iterator.hasNext() === false) {
        throw new Error("There's no any element")
    }
    let result = initialValue ?? iterator.next()
    while (iterator.hasNext()) {
        result = adder(result, iterator.next())
    }
    return result;
}