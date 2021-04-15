/*
 * dfs.ts
 * Created on Fri Apr 02 2021 11:43:58
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

import { Action1 } from "../../Action";
import HashSet from "../../data-structure/set/HashSet";
import ISet from "../../data-structure/set/ISet"
import IGraph from "../../data-structure/graph/IGraph";
import firstOrDefault from "../../data-structure/iterating/firstOrDefault";

/**
 * 深度优先搜索算法
 * 
 * @param start 
 * @param consumer 
 */
export default function <E>
    (g: IGraph<E>, consumer: Action1<E>, start?: E) {
    _dfs(g, start ?? firstOrDefault(g.vertices, null)!, consumer, new HashSet())
}
function _dfs<E>(g: IGraph<E>, e: E,
    consumer: Action1<E>,
    viewed: ISet<E>) {

    consumer(e)
    viewed.collectionAdd(e)

    const iterator = g.outOf(e).getIterator()
    while (iterator.hasNext()) {
        const _crt = iterator.next()
        if (!viewed.contains(_crt)) {
            _dfs(g, _crt, consumer, viewed)
        }
    }
}