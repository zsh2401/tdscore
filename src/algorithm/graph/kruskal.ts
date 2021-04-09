/*
 * kruskal.ts
 * Created on Tue Apr 06 2021 10:27:38
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
import IGraphEdge from "../../data-structure/graph/IGraphEdge"
import MSTreeNode from "./MSTreeNode";
import treeForEachNode from "../tree/treeForEachNode";
import quickSort from "../sort/quickSort";
import toJSArray from "../../data-structure/iterating/toJSArrayForItertable";
import equals from "../../equals";
import HashMap from "../../data-structure/map/HashMap"
import HashSet from "../../data-structure/set/HashSet"
import ISet from "../../data-structure/set/ISet"
import IteratingStream from "../../data-structure/iterating/IteratingStream"
import TreeNode from "../../data-structure/tree/TreeNode"

/**
 * Kruskal's algorithm finds a minimum spanning forest of an undirected edge-weighted graph. 
 * 
 * see https://en.wikipedia.org/wiki/Kruskal's_algorithm
 * @param g 
 * @param root 
 * @returns 
 */
export default function <E>(g: IGraph<E>, root: E): MSTreeNode<E> {
    const e = minEdges(g)
    return asTree(e, root)
}

function minEdges<E>(g: IGraph<E>): ISet<IGraphEdge<E>> {

    const a = toJSArray(g.edges)
    const r = new HashSet<IGraphEdge<E>>()
    const connectedComponents = new HashMap<E, ISet<IGraphEdge<E>>>()
    quickSort(a, (a, b) => {
        return a.weight - b.weight
    })
    a.forEach((edge) => {
        const fromCC = connectedComponents.mapGet(edge.from)
        const toCC = connectedComponents.mapGet(edge.to)

        // console.log(`edge:${edge.from}:${fromCC?.getHashCode() ?? 0}-${edge.to}:${toCC?.getHashCode() ?? 0}`)
        if (fromCC !== null && toCC !== null && equals(fromCC, toCC)) {
            // console.log(`rejected ${edge}`)
            return
        }


        combineCC(connectedComponents, edge.from, edge.to)
        // console.log(`combined:: ${edge.from}:${connectedComponents.mapGet(edge.from)?.getHashCode() ?? 0}-${edge.to}:${connectedComponents.mapGet(edge.to)?.getHashCode() ?? 0}`)
        r.add(edge)
        connectedComponents.mapGet(edge.from)?.setAdd(edge)
        // console.log(`${edge} has been accpted at cc ${connectedComponents.mapGet(edge.from)}`)
    })
    return r
}
function combineCC<E>(ccs: HashMap<E, ISet<IGraphEdge<E>>>, a: E, b: E) {
    const acc = ccs.mapGet(a)
    const bcc = ccs.mapGet(b)
    if (acc === null && bcc === null) {
        const rcc = new HashSet<IGraphEdge<E>>()
        ccs.mapPut(a, rcc)
        ccs.mapPut(b, rcc)
    } else if (acc === null && bcc !== null) {
        ccs.mapPut(a, bcc)
    } else if (acc !== null && bcc === null) {
        ccs.mapPut(b, acc)
    } else if (acc !== null && bcc !== null) {
        const toBeForEach = acc.size() < bcc.size() ? acc : bcc;
        const toBeCombined = toBeForEach === acc ? bcc : acc
        toBeForEach.forEach(edge => {
            ccs.mapPut(edge.from, toBeCombined)
            ccs.mapPut(edge.to, toBeCombined)
            toBeCombined.setAdd(edge)
        })
        ccs.mapPut(a, toBeCombined)
        ccs.mapPut(b, toBeCombined)
    }
}
function asTree<E>(edges: ISet<IGraphEdge<E>>, _root: E): MSTreeNode<E> {
    const root: MSTreeNode<E> = new TreeNode({ data: _root, cost: 0 })
    const findRelatedEdges = (e: E): IGraphEdge<E>[] => {
        return new IteratingStream(edges)
            .where(edge => equals(edge.from, e) || equals(edge.to, e))
            .asJSArray()
    }
    treeForEachNode(root, (node) => {
        findRelatedEdges(node.data.data).forEach(edge => {
            const child = equals(node.data.data, edge.from) ? edge.to : edge.from
            node.children.listAdd(new TreeNode({ data: child, cost: edge.weight }))
            edges.setRemove(edge)
        })
    })
    return root
}