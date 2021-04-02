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
import IGraphNode from "../../data-structure/graph/IGraphNode";

/**
 * 深度优先搜索算法
 * 
 * @param start 
 * @param consumer 
 */
export default function <E>
    (start: IGraphNode<E>, consumer: Action1<E>) {
    _dfs(start, consumer, new HashSet())
}
function _dfs<E>(node: IGraphNode<E>,
    consumer: Action1<E>,
    viewed: ISet<IGraphNode<E>>) {

    consumer(node.data)
    viewed.collectionAdd(node)

    const iterator = node.out.getIterator()
    while (iterator.hasNext()) {
        const _crt = iterator.next()
        if (!viewed.contains(_crt.node)) {
            _dfs(_crt.node, consumer, viewed)
        }
    }
}