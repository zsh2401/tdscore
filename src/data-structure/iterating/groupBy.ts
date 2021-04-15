/*
 * groupBy.ts
 * Created on Thu Apr 15 2021 14:38:15
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
import { Func1 } from "../../Func";
import LinkedList from "../linear/LinkedList";
import getIterator from "./getIterator";
import ESHashMap from "../map/ESHashMap";

export default function <E>(iterable: IIterable<E>, spliter: Func1<E, any>): IIterable<IIterable<E>> {
    const map = new ESHashMap<any, LinkedList<E>>()
    const iterator = getIterator(iterable)
    while (iterator.hasNext()) {
        const current = iterator.next()
        const key = spliter(current)
        let list = map.mapGet(key);
        if (list === null) {
            list = new LinkedList()
            map.mapPut(key, list)
        }
        list.listAdd(current)
    }
    return map.mapGetValues();
}