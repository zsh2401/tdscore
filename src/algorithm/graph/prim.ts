/*
 * prim.ts
 * Created on Tue Apr 06 2021 10:26:45
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
import HashMap from "../../data-structure/map/HashMap";
import TreeNode from "../../data-structure/tree/TreeNode"
import IMap from "../../data-structure/map/IMap"
import MSTreeNode from "./MSTreeNode";

/**
 * 
 * 普利姆算法（加点法）构建最小生成树
 * 
 * @param g 图
 * @param start 起点/根
 * @returns 最小生成树
 */
export default function <E>(g: IGraph<E>, start: E): MSTreeNode<E> {

    const root = new TreeNode({ data: start, cost: 0 })
    const vnMap = new HashMap<E, MSTreeNode<E>>()

    vnMap.mapPut(start, root)

    let _min = minWayOf(g, vnMap)
    while (_min) {
        const [from, to] = _min
        const newNode = new TreeNode({ data: to, cost: g.weightOf(from, to) })
        vnMap.mapPut(to, newNode)
        vnMap.mapGet(from)?.children.listAdd(newNode)
        _min = minWayOf(g, vnMap)
    }

    return root
}
function minWayOf<E>(g: IGraph<E>, vnMap: IMap<E, MSTreeNode<E>>): ([E, E, number]) | null {

    let result: ([E, E, number]) | null = null
    const i = vnMap.mapGetKeys().getIterator()

    let cost = Number.POSITIVE_INFINITY
    while (i.hasNext()) {

        const from = i.next()
        const j = g.outOf(from).getIterator()

        while (j.hasNext()) {
            const to: E = j.next()
            
            if (vnMap.mapGet(to) === null) {
               
                const _cost = g.weightOf(from, to)
                if (_cost < cost) {
                    cost = _cost
                    result = [from, to, _cost]
                }
            }
        }
    }
    // if (result)
    //     console.log(`from ${result[0]}->${result[1]} <${result[2]}> has been choosen from ${vnMap.mapGetKeys().toJSArray()}`)
    return result
}