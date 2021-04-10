/*
 * wbfs.ts
 * Created on Sat Apr 10 2021 12:47:46
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

import IGraph from "../../data-structure/graph/IGraph";
import HashMap from "../../data-structure/map/HashMap"
import HashSet from "../../data-structure/set/HashSet"
import ISet from "../../data-structure/set/ISet"
import IMap from "../../data-structure/map/IMap"
import IQueue from "../../data-structure/linear/IQueue"
import LinkedList from "../../data-structure/linear/LinkedList"

/**
 * 路径记录
 */
export interface PathNote<E> {

    /**
     * 指示要到此节点，要先到哪一个节点
     */
    prev: E

    /**
     * 表示到此处的花销/经过的节点
     */
    cost: number
}

/**
 * 使用BFS查找路径
 * @param g 
 * @param start 
 * @returns 一个记录到达特定点应该怎么走的Map
 */
export default function <E>(g: IGraph<E>, start: E): IMap<E, PathNote<E>> {

    const viewed: ISet<E> = new HashSet()
    const queue: IQueue<E> = new LinkedList()
    const result = new HashMap<E, PathNote<E>>()

    queue.queueEn(start)
    viewed.setAdd(start)
    result.mapPut(start, { prev: start, cost: 0 })

    while (!queue.isEmpty()) {
        const current = queue.queueDe()
        const iterator = g.outOf(current).getIterator()
        while (iterator.hasNext()) {
            const _crt = iterator.next()
            if (!viewed.contains(_crt)) {
                result.mapPut(_crt, {
                    prev: current,
                    cost: (result.mapGet(current)?.cost ?? 0) + 1
                })
                queue.queueEn(_crt)
            }
        }
    }

    return result
}