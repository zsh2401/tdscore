/*
 * size.ts
 * Created on Tue Jun 22 2021 08:43:35
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

import UIterable from "../data-structure/UIterable";
import getIterator from "./getIterator";
export const optimizedSizeGetter = Symbol("hidden optimized symbol")
export interface IOptionalSizeMethodOptimized {
    [optimizedSizeGetter]?: () => number
}
export default function size<E>(i: (UIterable<E> & IOptionalSizeMethodOptimized)) {
    const hidden = i[optimizedSizeGetter]

    if (hidden && typeof hidden === "function") {
        return i[optimizedSizeGetter]?.() ?? 0
    }

    const iterator = getIterator(i)
    let _size = 0;
    while (iterator.hasNext()) {
        _size++;
        iterator.next()
    }
    return _size;
}