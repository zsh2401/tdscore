import depthOf from "../data-structure/tree/depthOf"
import { IComparer } from "./sort/IInternalSortAlgorithm";
import IBTreeNode from "../data-structure/tree/IBTreeNode"
import { BTreeNode } from "../data-structure";

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
export function adjustAvl<E>(tree: IBTreeNode<E>): IBTreeNode<E> {

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

    } else if (bf == -2) {//右子树太重
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
export function avlDelete<E>(tree: IBTreeNode<E>, e: E, c: IComparer<E>): IBTreeNode<E> {
    //TODO
    throw new Error("Method has not been implemented.")
}

function _ll<E>(tree: IBTreeNode<E>): IBTreeNode<E> {
    return avlRotateRight(tree)
}
function _lr<E>(tree: IBTreeNode<E>): IBTreeNode<E> {
    tree.left = tree.left && avlRotateLeft(tree.left)
    return avlRotateRight(tree)
}
function _rr<E>(tree: IBTreeNode<E>): IBTreeNode<E> {
    return avlRotateLeft(tree)
}
function _rl<E>(tree: IBTreeNode<E>): IBTreeNode<E> {
    tree.right = tree.right && avlRotateRight(tree.right)
    return avlRotateLeft(tree)
}
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