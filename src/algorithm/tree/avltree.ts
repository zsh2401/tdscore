/*
 * avl.ts
 * Created on Tue Mar 30 2021 16:43:26
 *
 * Description: 
 *   Operations related to AVL Tree.
 * 
 *   AVL树（Adelson-Velsky and Landis Tree）是计算机科学中最早被发明的自平衡二叉查找树。
 *   在AVL树中，任一节点对应的两棵子树的最大高度差为1，因此它也被称为高度平衡树。
 *   查找、插入和删除在平均和最坏情况下的时间复杂度都是O(log n)。
 *   增加和删除元素的操作则可能需要借由一次或多次树旋转，以实现树的重新平衡。
 *   AVL树得名于它的发明者G. M. Adelson-Velsky和Evgenii Landis，他们在
 *   1962年的论文《An algorithm for the organization of information》中
 *   公开了这一数据结构。
 * 
 *   In computer science, an AVL tree (named after inventors 
 *   Adelson-Velsky and Landis) is a self-balancing binary 
 *   search tree. It was the first such data structure to be 
 *   invented.[2] In an AVL tree, the heights of the two child 
 *   subtrees of any node differ by at most one; if at any time 
 *   they differ by more than one, rebalancing is done to restore 
 *   this property. Lookup, insertion, and deletion all take O(log n) 
 *   time in both the average and worst cases, where n is the number of 
 *   nodes in the tree prior to the operation. Insertions and deletions
 *   may require the tree to be rebalanced by one or more tree rotations.
 *
 *    The AVL tree is named after its two Soviet inventors, Georgy Adelson-Velsky 
 *   and Evgenii Landis, who published it in their 1962 paper 
 *   "An algorithm for the organization of information".
 *   https://zh.wikipedia.org/zh-hans/AVL%E6%A0%91
 *   https://en.wikipedia.org/wiki/AVL_tree
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

import depthOf from "../../data-structure/tree/depthOf"
import { IComparer } from "../sort/IInternalSortAlgorithm";
import IBiTreeNode from "../../data-structure/tree/IBiTreeNode"
import BTreeNode from "../../data-structure/tree/BiTreeNode";
import Nullable from "../../Nullable";
import PositionGuider from "./PositionGuider";


export interface AvlBiTreeNodeData<E> {
    bf: number
    data: E
}

export type AvlBiTreeNode<E> = IBiTreeNode<E>

/**
 * 计算二叉树的平衡因子
 * 正数则左边较重，0则完全平衡，负数则右边较重
 * @param tree 
 * @returns 
 */
export function blanceFactorOf<E>(tree: IBiTreeNode<E> | null | undefined): number {
    if (!tree) return 0
    return depthOf(tree.left) - depthOf(tree.right)
}

/**
 * 
 * AVL左旋
 * https://zhuanlan.zhihu.com/p/56066942
 * 
 * @param tree 
 * @returns 
 */
export function avlRotateLeft<E>(tree: AvlBiTreeNode<E>): AvlBiTreeNode<E> {
    if (!tree.right) return tree;
    const root = tree.right
    tree.right = root.left
    root.left = tree
    return root
}

/**
 * 
 * AVL右旋
 * https://zhuanlan.zhihu.com/p/56066942
 * 
 * @param tree 
 */
export function avlRotateRight<E>(tree: AvlBiTreeNode<E>): AvlBiTreeNode<E> {
    if (!tree.left) return tree;
    const root = tree.left
    tree.left = root.right
    root.right = tree
    return root
}

/**
 * 平衡二叉树插入
 * 
 * https://www.jianshu.com/p/44d3e7699cda?from=singlemessage
 * 
 * @param tree 
 * @param e 
 * @param c 
 * @returns 
 */
export function avlInsert<E>(tree: AvlBiTreeNode<E>, e: E, c: IComparer<E>): AvlBiTreeNode<E> {

    //以二叉查找树的方式插入
    _insert(tree, e, c)

    //调整二叉平衡树
    return adjustAvl(tree)

}

/**
 * 
 * 创建一个针对某棵树的特定的AVL树插入闭包函数
 * 
 * @param tree 
 * @param c 
 * @returns 
 */
export function createAvlInserter<E>(tree: AvlBiTreeNode<E>, c: IComparer<E>):
    (node: E) => AvlBiTreeNode<E> {

    return (node: E) => {
        tree = avlInsert(tree, node, c)
        return tree;
    }

}

/**
 * 调整平衡二叉树
 * @param tree 
 * @returns 
 */
function adjustAvl<E>(tree: AvlBiTreeNode<E>): AvlBiTreeNode<E> {

    //计算平衡因子
    const bf = blanceFactorOf(tree)

    //左子树太重
    if (bf == 2) {

        //LR型
        if (blanceFactorOf(tree.left) === -1) {
            return _lr(tree)
        } else {
            //LL型
            return _ll(tree)
        }

    }
    //右子树太重
    else if (bf == -2) {
        //RL型
        if (blanceFactorOf(tree.right) === 1) {
            return _rl(tree)
        } else {
            //RR型
            return _rr(tree)
        }

    }
    return tree
}

/**
 * 删除节点
 * 
 * https://blog.csdn.net/goodluckwhh/article/details/11786079
 * 
 * @param tree 
 * @param e 
 * @param c 
 */
export function avlDelete<E>(tree: AvlBiTreeNode<E>, e: E, c: IComparer<E>): Nullable<AvlBiTreeNode<E>> {

    //使用一个超级根节点，使代码无需多余的NULL判断
    const superRoot = new BTreeNode<E>(undefined!)
    superRoot.left = tree

    //父节点
    let parent: AvlBiTreeNode<E> = superRoot

    //目标节点
    let targetNode: AvlBiTreeNode<E> | null = null

    //查找函数，如果找到目标，则target会赋值，parent则是其双亲节点
    function find(_tree: AvlBiTreeNode<E>): void {

        //比较
        const cr = c(_tree.data, e)

        //e equals to node
        if (cr === 0) {
            targetNode = _tree
        } else if (cr < 0) { //node greater than e
            if (_tree.right) {
                parent = _tree;
                find(_tree.right)
            }
            // NOT FOUND
        } else if (cr > 0) { // node less thant e
            if (_tree.left) {
                parent = _tree;
                find(_tree.left)
            }
            // NOT FOUND
        }
    }

    //进行查找
    find(superRoot.left)


    //fuck typescript
    targetNode = <AvlBiTreeNode<E> | null>targetNode;

    //Can not find the target
    if (targetNode === null) {
        return superRoot.left
    }

    //左右子树都有
    if (targetNode.left && targetNode.right) {
        _deleteDoubleChildrenNode(parent, targetNode)
    }

    // 独生子或丁克
    else {

        //直接删除，然后把孩子接过来
        if (parent.left === targetNode) {

            parent.left = targetNode.left || targetNode.right

        } else {

            parent.right = targetNode.left || targetNode.right
        }

    }

    return superRoot.left === null ? null : adjustAvl(superRoot.left);
}

/**
 * 删除有两个孩子的结点
 * @param parent 
 * @param target 
 * @param c 
 */
function _deleteDoubleChildrenNode<E>(parent: AvlBiTreeNode<E>, target: AvlBiTreeNode<E>): void {

    //删除右子树的最小关键字
    if (blanceFactorOf(target) + 1 > 0) {

        const [maxParent, max] = findMax(target, target.left!)

        if (maxParent.right === max) {
            maxParent.right = max.left
        } else {
            maxParent.left = max.left
        }
        if (parent.right === target) {
            parent.right = max
        } else {
            parent.left = max
        }

        max.left = target.left
        max.right = target.right
    } else {
        const [minParent, min] = findMin(target, target.right!)

        if (minParent.right === min) {
            minParent.right = min.right
        } else {
            minParent.left = min.left
        }
        if (parent.right === target) {
            parent.right = min
        } else {
            parent.left = min
        }

        min.left = target.left
        min.right = target.right
    }
}

/**
 * 找出最大的节点
 * 
 * @param tree 
 * @returns parent and it's selft
 */
function findMax<E>(parent: AvlBiTreeNode<E>, tree: AvlBiTreeNode<E>): [AvlBiTreeNode<E>, AvlBiTreeNode<E>] {
    if (tree.right === null) {
        return [parent, tree]
    }
    return findMax(tree, tree.right)
}

/**
 * 找出最小的节点
 * 
 * @param tree 
 * @returns 
 */
function findMin<E>(parent: AvlBiTreeNode<E>, tree: AvlBiTreeNode<E>): [AvlBiTreeNode<E>, AvlBiTreeNode<E>] {
    if (tree.left === null) {
        return [parent, tree]
    }
    return findMax(tree, tree.left)
}

/**
 * 
 * 创建一个针对某棵树的特定的AVL树元素删除闭包函数
 * 
 * @param tree 
 * @param c 
 * @returns 
 */
export function createAvlDeleter<E>(tree: AvlBiTreeNode<E>, c: IComparer<E>): (e: E) => Nullable<AvlBiTreeNode<E>> {
    let mTree: Nullable<AvlBiTreeNode<E>> = tree
    return (e: E) => {
        mTree = avlDelete(tree, e, c)
        return mTree
    }
}

/**
 * AVL树搜索
 * @param tree 
 * @param guider 
 * @returns 
 */
export function avlSearch<E>(tree: AvlBiTreeNode<E>, guider: PositionGuider<E>)
    : Nullable<AvlBiTreeNode<E>> {

    const cr = guider(tree.data)
    if (cr === 0) {
        return tree
    } else if (cr > 0) {
        return tree.left ? avlSearch(tree.left, guider) : null;
    } else {
        return tree.right ? avlSearch(tree.right, guider) : null;
    }

}
/**
 * LL型调整
 * @param tree 
 * @returns 
 */
function _ll<E>(tree: AvlBiTreeNode<E>): AvlBiTreeNode<E> {
    return avlRotateRight(tree)
}
/**
 * LR型调整
 * @param tree 
 * @returns 
 */
function _lr<E>(tree: AvlBiTreeNode<E>): AvlBiTreeNode<E> {
    tree.left = tree.left && avlRotateLeft(tree.left)
    return avlRotateRight(tree)
}
/**
 * RR型调整
 * @param tree 
 * @returns 
 */
function _rr<E>(tree: AvlBiTreeNode<E>): AvlBiTreeNode<E> {
    return avlRotateLeft(tree)
}
/**
 * RL型调整
 * @param tree 
 * @returns 
 */
function _rl<E>(tree: AvlBiTreeNode<E>): AvlBiTreeNode<E> {
    tree.right = tree.right && avlRotateRight(tree.right)
    return avlRotateLeft(tree)
}
/**
 * 以二查查找树的方式插入
 * @param tree 
 * @param e 
 * @param c 
 * @returns 
 */
function _insert<E>(tree: AvlBiTreeNode<E>, e: E, c: IComparer<E>): void {
    const result = c(tree.data, e);
    if (result <= 0) {
        if (tree.right === null) {
            tree.right = new BTreeNode(e)
        } else {
            return _insert(tree.right, e, c)
        }
    } else {
        if (tree.left === null) {
            tree.left = new BTreeNode(e)
        } else {
            return _insert(tree.left, e, c)
        }
    }
}