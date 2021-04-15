import { IIterable } from "..";
import { Func1 } from "../../Func";
import getIterator from "./getIterator";

/*
 * first.ts
 * Created on Thu Apr 15 2021 13:55:41
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
export default function <E>(iterable: IIterable<E>, predicate?: Func1<E, boolean>): E {
    const iterator = getIterator(iterable)
    while (iterator.hasNext()) {
        iterator.next()
        if (predicate) {
            if (predicate(iterator.current())) {
                return iterator.current()
            }
        } else {
            return iterator.next()
        }
    }
    throw new Error("Element not found.")
}