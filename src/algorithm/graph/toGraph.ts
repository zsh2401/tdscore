/*
 * toGraph.ts
 * Created on Tue Apr 06 2021 08:57:11
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
import SimpleEdge from "../../data-structure/graph/SimpleEdge";
import IGraph from "../../data-structure/graph/IGraph";
import IGraphNode from "../../data-structure/graph/IGraphNode";
import SimpleGraph from "../../data-structure/graph/SimpleGraph";
import HashSet from "../../data-structure/set/HashSet";
import ISet from "../../data-structure/set/ISet";

export default function <E>(start: IGraphNode<E>): IGraph<E> {
    const g: IGraph<E> = new SimpleGraph<E>()
    _dfs(start, node => {
        g.vertices.setAdd(node.data)
        const iterator = g.edges.getIterator()
        while (iterator.hasNext()) {
            const e = iterator.next()
            g.edges.setAdd(new SimpleEdge(e.from, e.to, e.weigth))
        }
    }, new HashSet())
    return g;
}
function _dfs<E>(node: IGraphNode<E>,
    consumer: Action1<IGraphNode<E>>,
    viewed: ISet<IGraphNode<E>>) {

    consumer(node)
    viewed.collectionAdd(node)

    const iterator = node.out.getIterator()
    while (iterator.hasNext()) {
        const _crt = iterator.next()
        if (!viewed.contains(_crt.node)) {
            _dfs(_crt.node, consumer, viewed)
        }
    }
}