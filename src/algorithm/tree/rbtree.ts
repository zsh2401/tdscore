/*
 * rbtree.ts
 * Created on Tue Mar 30 2021 16:49:45
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

import IBiTreeNode from "../../data-structure/tree/IBiTreeNode";
import Nullable from "../../Nullable";
import PositionGuider from "./PositionGuider";
import IComparer from "../sort/IInternalSortAlgorithm";
import BiTreeNode from "../../data-structure/tree/BiTreeNode";

/**
 * 红黑树属性定义，套了一层壳，带上了颜色属性
 */
export interface RedBlackTreeNodeProperties<E> {
    data: E
    nil: boolean
    color: "red" | "black"
}

/**
 * 红黑树节点定义，在二叉树节点之上进行拓展
 */
export type RedBlackTreeNode<E> = IBiTreeNode<RedBlackTreeNodeProperties<E>>

/**
 * 红黑树插入
 * 
 * @param tree 
 * @param newElement 
 * @param comparer 
 */
export function rbtreeInsert<E>(tree: RedBlackTreeNode<E> | null, newElement: E, comparer: IComparer<E>):
    RedBlackTreeNode<E> {
    if (tree) {

    } else {
        return new BiTreeNode({
            data: newElement,
            color: "black",
            nil: false
        });
    }
    throw new Error("Method has not been implemented.")
}

/**
 * 红黑树删除元素
 * 
 * @param tree 
 * @param target 
 * @param comparer 
 */
export function rbtreeDelete<E>(tree: RedBlackTreeNode<E>, target: E, comparer: IComparer<E>):
    Nullable<RedBlackTreeNode<E>> {
    throw new Error("Method has not been implemented.")
}

/**
 * 
 * 红黑树查找元素
 * 
 * @param tree 
 * @param guider 
 * @returns 
 */
export function rbtreeSearch<E>(tree: RedBlackTreeNode<E>, guider: PositionGuider<E>):
    Nullable<RedBlackTreeNode<E>> {

    const cr = guider(tree.data.data)
    if (cr === 0) {
        return tree
    } else if (cr > 0) {
        return tree.left ? rbtreeSearch(tree.left, guider) : null;
    } else {
        return tree.right ? rbtreeSearch(tree.right, guider) : null;
    }

}