/*
 * toGraphNode.ts
 * Created on Tue Apr 06 2021 09:07:45
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

import IMap from "../../data-structure/map/IMap";
import HashMap from "../../data-structure/map/HashMap"
import IGraph from "../../data-structure/graph/IGraph";
import IGraphNode from "../../data-structure/graph/IGraphNode";
import SimpleGraphNode from "../../data-structure/graph/SimpleGraphNode";
import { IIterable } from "../../data-structure";

export default function <E>(g: IGraph<E>): IIterable<IGraphNode<E>> {

    const map: IMap<E, IGraphNode<E>> = new HashMap()

    const getOrCreateNode = (e: E) => {
        let r: IGraphNode<E> | null = map.mapGet(e)
        if (r === null) {
            r = new SimpleGraphNode(e)
            map.mapPut(e, r)
        }
        return r
    }

    g.vertices.forEach((v) => {
        getOrCreateNode(v)
    })

    g.edges.forEach(e => {
        const from: IGraphNode<E> = getOrCreateNode(e.from)
        const to: IGraphNode<E> = getOrCreateNode(e.to)
        from.out.collectionAdd({
            node: to,
            weight: e.weigth ?? 0
        })
    })

    return map.mapGetValues()
}