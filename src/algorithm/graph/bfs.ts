/*
 * bfs.ts
 * Created on Fri Apr 02 2021 11:38:03
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

import HashSet from "../../data-structure/set/HashSet"
import IQueue from "../../data-structure/linear/IQueue"
import ISet from "../../data-structure/set/ISet"
import LinkedList from "../../data-structure/linear/LinkedList"
import { Func1 } from "../../Func";
import IGraph from "../../data-structure/graph/IGraph";
import defaultOrFirst from "../../data-structure/iterating/defaultOrFirst";

/**
 * BFS 广度优先搜索算法
 * 
 * @param start 
 * @param consumer 
 * @returns 
 */
export default function <E>
    (g: IGraph<E>, consumer: Func1<E, boolean | void>, start: (E | null) = defaultOrFirst(g.vertices)) {
    const viewed: ISet<E> = new HashSet()
    const queue: IQueue<E> = new LinkedList()
    if (start === null) {
        return;
    }
    queue.queueEn(start)
    while (!queue.isEmpty()) {
        const current = queue.queueDe()
        if (consumer(current) === false) {
            return
        }
        viewed.setAdd(current)
        const iterator = g.outOf(current).getIterator()
        while (iterator.hasNext()) {
            const _crt = iterator.next()
            if (!viewed.contains(_crt)) {
                queue.queueEn(_crt)
            }
        }
    }
}