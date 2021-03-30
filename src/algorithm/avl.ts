import depthOf from "../data-structure/tree/depthOf"
import { IComparer } from "./sort/IInternalSortAlgorithm";
import IBTreeNode from "../data-structure/tree/IBTreeNode"

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
 * 平衡二叉树左旋
 * https://zhuanlan.zhihu.com/p/56066942
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
 * 平衡二叉树右旋
 * https://zhuanlan.zhihu.com/p/56066942
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
 * @param tree 
 * @param e 
 * @param c 
 * @returns 
 */
export function avlInsert<E>(tree: IBTreeNode<E>, e: E, c: IComparer<E>): IBTreeNode<E> {
    //TODO
    throw new Error("Method has not been implemented.")
    // const cr = c(tree.data, e)
    // const gotoRight = cr < 0;
    // if (gotoRight) {
    //     tree.right = justInsert(null, tree, e, c)
    // } else {
    //     tree.left = justInsert(null, tree, e, c)
    // }
    // if (gotoRight) {
    //     return avlRotateLeft(tree)
    // } else {
    //     return avlRotateRight(tree)
    // }
}
export function avlDelete<E>(tree: IBTreeNode<E>, e: E, c: IComparer<E>): IBTreeNode<E> {
    //TODO
    throw new Error("Method has not been implemented.")
}
// function justInsert<E>(parent: IBTreeNode<E> | null, tree: IBTreeNode<E>, e: E, c: IComparer<E>): IBTreeNode<E> {
//     const result = c(tree.data, e);
//     if (result <= 0) {
//         if (tree.right === null) {
//             tree.right = new BTreeNode(e)
//             if (parent && parent.left === tree) {
//                 return avlRotateRight(tree)
//             }
//         } else {
//             return justInsert(tree.right, e, c)
//         }
//     } else {
//         if (tree.left === null) {
//             tree.left = new BTreeNode(e)
//             if (parent && parent.right === tree) {
//                 return avlRotateRight(tree)
//             }
//         } else {
//             return justInsert(tree.left, e, c)
//         }
//     }
// }
// function ll() { }