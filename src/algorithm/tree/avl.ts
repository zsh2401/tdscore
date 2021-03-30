/*
 * avl.ts
 * Created on Tue Mar 30 2021 16:43:26
 *
 * Description: 
 *   Operations related to AVL Tree
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
import IBTreeNode from "../../data-structure/tree/IBTreeNode"
import BTreeNode from "../../data-structure/tree/BTreeNode";
import Nullable from "../../Nullable";
import PositionGuider from "./PositionGuider";

/**
 * 计算二叉树的平衡因子
 * @param tree 
 * @returns 
 */
export function blanceFactorOf<E>(tree: IBTreeNode<E> | null | undefined): number {
    if (!tree) return 0
    return depthOf(tree.left) - depthOf(tree.right)
}

/**
 * 
 * 平衡二叉树左旋
 * https://zhuanlan.zhihu.com/p/56066942
 * 
 * @param tree 
 * @returns 
 */
export function avlRotateLeft<E>(tree: IBTreeNode<E>): IBTreeNode<E> {
    if (!tree.right) return tree;
    const root = tree.right
    tree.right = root.left
    root.left = tree
    return root
}

/**
 * 
 * 平衡二叉树右旋
 * https://zhuanlan.zhihu.com/p/56066942
 * 
 * @param tree 
 */
export function avlRotateRight<E>(tree: IBTreeNode<E>): IBTreeNode<E> {
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
export function avlInsert<E>(tree: IBTreeNode<E>, e: E, c: IComparer<E>): IBTreeNode<E> {

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
export function createAvlInserter<E>(tree: IBTreeNode<E>, c: IComparer<E>):
    (node: E) => IBTreeNode<E> {

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
function adjustAvl<E>(tree: IBTreeNode<E>): IBTreeNode<E> {

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
export function avlDelete<E>(tree: IBTreeNode<E>, e: E, c: IComparer<E>): Nullable<IBTreeNode<E>> {

    //使用一个超级根节点，使代码无需多余的NULL判断
    const superRoot = new BTreeNode<E>(undefined!)
    superRoot.left = tree

    //父节点
    let parent: IBTreeNode<E> = superRoot

    //目标节点
    let targetNode: IBTreeNode<E> | null = null

    //查找函数，如果找到目标，则target会赋值，parent则是其双亲节点
    function find(_tree: IBTreeNode<E>): void {

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

    // console.log(`${nodeToBeDeleted!.data}\n${parent!.data}`)

    //fuck typescript
    targetNode = <IBTreeNode<E> | null>targetNode;

    //Can not find the target
    if (targetNode === null) {
        return superRoot.left
    }

    //左右子树都有
    if (targetNode.left && targetNode.right) {
        _deleteDoubleChildrenNode(parent, targetNode, c)
    }
    // 独生子
    else if (targetNode.left || targetNode.right) {

        if (parent.left === targetNode) {

            parent.left = targetNode.left || targetNode.right

        } else {

            parent.right = targetNode.left || targetNode.right
        }

    }
    // 丁克
    else {

        if (parent.left === targetNode) {

            parent.left = null

        } else {

            parent.right = null

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
function _deleteDoubleChildrenNode<E>(parent: IBTreeNode<E>, target: IBTreeNode<E>, c: IComparer<E>): void {

    //0 or 1
    // if (blanceFactorOf(target) + 1 > 0) {
    //     const max = findMax(target.left!)
    //     if (parent.left === target) {
    //         parent.left = max
    //     } else {
    //         parent.right = max
    //     }
    //     target.left!
    // } else {

    // }

}
// function findMax(target: IBTreeNode<E>): IBTreeNode<E> {

// }

/**
 * 
 * 创建一个针对某棵树的特定的AVL树元素删除闭包函数
 * 
 * @param tree 
 * @param c 
 * @returns 
 */
export function createAvlDeleter<E>(tree: IBTreeNode<E>, c: IComparer<E>): (e: E) => Nullable<IBTreeNode<E>> {
    let mTree: Nullable<IBTreeNode<E>> = tree
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
export function avlSearch<E>(tree: IBTreeNode<E>, guider: PositionGuider<E>)
    : Nullable<IBTreeNode<E>> {

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
function _ll<E>(tree: IBTreeNode<E>): IBTreeNode<E> {
    return avlRotateRight(tree)
}
/**
 * LR型调整
 * @param tree 
 * @returns 
 */
function _lr<E>(tree: IBTreeNode<E>): IBTreeNode<E> {
    tree.left = tree.left && avlRotateLeft(tree.left)
    return avlRotateRight(tree)
}
/**
 * RR型调整
 * @param tree 
 * @returns 
 */
function _rr<E>(tree: IBTreeNode<E>): IBTreeNode<E> {
    return avlRotateLeft(tree)
}
/**
 * RL型调整
 * @param tree 
 * @returns 
 */
function _rl<E>(tree: IBTreeNode<E>): IBTreeNode<E> {
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
function _insert<E>(tree: IBTreeNode<E>, e: E, c: IComparer<E>): void {
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