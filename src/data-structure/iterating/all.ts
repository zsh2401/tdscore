/*
 * all.ts
 * Created on Thu Apr 15 2021 14:35:26
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

import { Func1 } from "../../Func";
import UIterable from "../UIterable";
import getIterator from "./getIterator";

export default function <E>(iterable: UIterable<E>, predicate: Func1<E, boolean>): boolean {
    const iterator = getIterator(iterable)
    while (iterator.hasNext()) {
        if (!predicate(iterator.next())) {
            return false
        }
    }
    return true
}