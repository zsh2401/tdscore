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
import toJSArray from "../../ixa/toJSArrayForItertable";
import equals from "../../equals";
import HashMap from "../../data-structure/map/HashMap"
import HashSet from "../../data-structure/set/HashSet"
import ISet from "../../data-structure/set/ISet"
import Chain from "../../ixa/Chain"
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

/**
 * 获取最小消耗的所有无环边集
 * @param g 
 * @returns 
 */
function minEdges<E>(g: IGraph<E>): ISet<IGraphEdge<E>> {

    //将边集转换为JS数组存储
    const a: IGraphEdge<E>[] = toJSArray(g.edges)
    //结果集
    const r = new HashSet<IGraphEdge<E>>()

    //每个元素所属的连通子图集
    const connectedComponents = new HashMap<E, ISet<IGraphEdge<E>>>()

    //将所有边按权重/消耗升序排序
    quickSort(a, (a: IGraphEdge<E>, b: IGraphEdge<E>) => {
        return a.weight - b.weight
    })

    //遍历所有边
    a.forEach((edge) => {

        //获取起点所属的连通子图
        const fromCC = connectedComponents.mapGet(edge.from)

        //获取终点所属的连通子图
        const toCC = connectedComponents.mapGet(edge.to)

        //如果起点与终点属于同一连通子图，相连则形成回环，此边抛弃
        if (fromCC !== null && toCC !== null && equals(fromCC, toCC)) {
            return
        }

        //无回环，将两个点所属的连通图进行合并
        combineCC(connectedComponents, edge.from, edge.to)

        //添加到结果集
        r.add(edge)

        //在当前连通子图中加入该边
        connectedComponents.mapGet(edge.from)?.setAdd(edge)
    })
    return r
}

/**
 * 合并两个连通子图
 * @param ccs 
 * @param a 
 * @param b 
 */
function combineCC<E>(ccs: HashMap<E, ISet<IGraphEdge<E>>>, a: E, b: E) {

    const acc = ccs.mapGet(a)//获取a所在的连通子图
    const bcc = ccs.mapGet(b)//获取b所在的连通子图

    //如果两个元素的连通子图都没初始化，直接归到同一个对象上
    if (acc === null && bcc === null) {
        const rcc = new HashSet<IGraphEdge<E>>()
        ccs.mapPut(a, rcc)
        ccs.mapPut(b, rcc)
    }
    //如果只有其中一个元素的连通子图未初始化，则直接复用另一个对象的
    else if (acc === null && bcc !== null) {
        ccs.mapPut(a, bcc)
    } else if (acc !== null && bcc === null) {
        ccs.mapPut(b, acc)
    }

    //如果两边都初始化了
    else if (acc !== null && bcc !== null) {

        //将边较少的连通子图集合内容转移到边较多的集合中
        const toBeForEach = acc.collectionSize() < bcc.collectionSize() ? acc : bcc;
        const toBeCombined = toBeForEach === acc ? bcc : acc

        //遍历被转移连通子图的边集
        toBeForEach.collectionForEach(edge => {
            //设置该边起点与终点的连通子图为被合并的子图
            ccs.mapPut(edge.from, toBeCombined)
            ccs.mapPut(edge.to, toBeCombined)

            //在被合并子图中加入这条边
            toBeCombined.setAdd(edge)
        })
    }
}
/**
 * 将边集转换为一棵树
 * @param edges 
 * @param _root 
 * @returns 
 */
function asTree<E>(edges: ISet<IGraphEdge<E>>, _root: E): MSTreeNode<E> {
    //构建根节点
    const root: MSTreeNode<E> = new TreeNode({ data: _root, cost: 0 })

    //获取某个节点的邻边
    const findRelatedEdges = (e: E): IGraphEdge<E>[] => {
        return new Chain(edges)
            .where(edge => equals(edge.from, e) || equals(edge.to, e))
            .asJSArray()
    }

    //从根出发遍历节点
    treeForEachNode(root, (node) => {
        //查找当前节点的相关的边
        findRelatedEdges(node.data.data).forEach(edge => {
            //添加到孩子中
            const child = equals(node.data.data, edge.from) ? edge.to : edge.from
            node.children.listAdd(new TreeNode({ data: child, cost: edge.weight }))
            edges.setRemove(edge)
        })
    }, "pre-order")

    //返回树根
    return root
}