/*
 * binaryTreeSearch.ts
 * Created on Mon Mar 29 2021 09:09:27
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
import { BTreeNode } from "../../data-structure";
import IBiTreeNode from "../../data-structure/tree/IBiTreeNode";
import dsHashCode from "../../hash";
import IArrayLike from "../../IArrayLike";

/**
 * 基本思想： 二叉查找树是先对待查找的数据进行生成树，确保树的左分支的值小于右分支的值，
 * 然后在就行和每个节点的父节点比较大小，查找最适合的范围。 这个算法的查找效率很高，
 * 但是如果使用这种查找方法要首先创建树。  
 *
 * 二叉查找树（BinarySearch Tree，也叫二叉搜索树，或称二叉排序树Binary Sort Tree）或
 * 者是一棵空树，或者是具有下列性质的二叉树：
 *
 * 1）若任意节点的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
 *
 * 2）若任意节点的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
 *
 * 3）任意节点的左、右子树也分别为二叉查找树。
 *
 * 二叉查找树性质： 对二叉查找树进行中序遍历，即可得到有序的数列。
 *
 * 复杂度分析： 它和二分查找一样，插入和查找的时间复杂度均为O(logn)，但是
 * 在最坏的情况下仍然会有O(n)的时间复杂度。 原因在于插入和删除元素的时候，
 * 树没有保持平衡，我们需要进行n次查找操作）。
 * 我们追求的是在最坏的情况下仍然有较好的时间复杂度，这就是平衡查找树设计的初衷。
 * 
 */
export default function <E>(a: IArrayLike<E>):
    IBiTreeNode<E> {
    //无效的树
    if (a.length < 1) {
        throw new Error("There's nothing to be used for building binary search tree.")
    }
    //创建根节点
    let root: IBiTreeNode<E> = new BTreeNode(a[0])

    //将所有元素插入到根节点中
    for (let i = 1; i < a.length; i++) {
        insertInto(root, a[i], dsHashCode(root.data), dsHashCode(a[i]))
    }

    return root
}
/**
 * 
 * @param tree 
 * @param e 
 * @param tHash 根节点数据的哈希值
 * @param eHash 元素的哈希值
 */
function insertInto<E>(tree: IBiTreeNode<E>, e: E, tHash: number, eHash: number): void {
    //当根大于元素，元素要到左边去
    if (tHash >= eHash) {
        //左节点是空的，直接插入
        if (tree.left === null) {
            // console.log(`set ${e}#${eHash} as ${tree.data}#${tHash}'s left child`)
            const newNode = new BTreeNode(e)
            newNode.parent = tree
            tree.left = newNode
        } else {//继续查找
            insertInto(tree.left, e, dsHashCode(tree.left.data), eHash)
        }
    } else {//当根小于元素，元素要到右边去
        if (tree.right === null) {
            // console.log(`set ${e} as ${tree.data}'s right child`)
            const newNode = new BTreeNode(e)
            newNode.parent = tree
            tree.right = newNode
        } else {//继续查找
            insertInto(tree.right, e, dsHashCode(tree.right.data), eHash)
        }
    }
}