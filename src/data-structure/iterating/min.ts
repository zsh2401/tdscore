/*
 * min.ts
 * Created on Sat Apr 10 2021 00:11:47
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

import IComparer from "../../IComparer";
import IIterable from "../IIterable";
import getIterator from "./getIterator";


/**
 * Find the min element in a iterable object.
 * @param iterable 
 * @param comparaer 
 * @returns 
 */
export default function <E>(iterable: IIterable<E>, comparaer: IComparer<E>): E {
    const iterator = getIterator<E>(iterable)
    if (iterator.hasNext()) {
        throw new Error("No elemnt")
    }
    let min: E = iterator.next()
    while (iterator.hasNext()) {
        const current = iterator.next()
        if (comparaer(current, min) < 0) {
            min = current
        }
    }
    return min
}