/*
 * max.ts
 * Created on Sat Apr 10 2021 00:16:28
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

import IComparer from "../IComparer"
import UIterable from "../data-structure/UIterable"
import getIterator from "./getIterator"

/**
 * 遍历全部数据，并返回最大的。
 * 如果没有数据，则抛出异常
 * @param iterable 
 * @param comparaer 
 * @returns 
 */
export default function <E>(iterable: UIterable<E>, comparaer: IComparer<E>): E {
    const iterator = getIterator<E>(iterable)
    if (iterator.hasNext()) {
        throw new Error("No elemnt")
    }
    let max: E = iterator.next()
    while (iterator.hasNext()) {
        const current = iterator.next()
        if (comparaer(current, max) > 0) {
            max = current
        }
    }
    return max
}