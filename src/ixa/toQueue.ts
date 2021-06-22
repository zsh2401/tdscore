/*
 * toQueue.ts
 * Created on Sat Mar 13 2021 01:29:12
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

import IQueue from "../data-structure/linear/IQueue";
import LinkedList from "../data-structure/linear/LinkedList";
import UIterable from "../data-structure/UIterable";
import getIterator from "./getIterator";

export default function <E>(i: UIterable<E>, reverse: boolean = false): IQueue<E> {
    const list = new LinkedList<E>()
    const iterator = getIterator<E>(i)
    while (iterator.hasNext()) {
        if (reverse) {
            list.listInsert(0, iterator.next());
        } else {
            list.listAdd(iterator.next());
        }
    }
    return list;
}