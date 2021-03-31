/*
 * BTreeNode.ts
 * Created on Mon Mar 29 2021 19:45:03
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

import Nullable from "../../Nullable";
import IBiTreeNode from "./IBiTreeNode";
import TreeNode from "./TreeNode";

/**
 * 标准的二叉树节点实现
 */
export default class BTreeNode<E> extends TreeNode<E> implements IBiTreeNode<E>{
    
    private _left: Nullable<IBiTreeNode<E>> = null
    private _right: Nullable<IBiTreeNode<E>> = null

    get left(): Nullable<IBiTreeNode<E>> {
        return this._left
    }

    set left(v: Nullable<IBiTreeNode<E>>) {
        this.applyLeft(v)
        this._left = v
    }

    get right(): Nullable<IBiTreeNode<E>> {
        return this._right
    }

    set right(v: Nullable<IBiTreeNode<E>>) {
        this.applyRight(v)
        this._right = v
    }

    applyLeft(v: Nullable<IBiTreeNode<E>>) {
        if (this._left) {
            this.children.collectionRemove(this._left)
        }
        if (v) {
            this.children.collectionAdd(v)
        }

    }
    applyRight(v: Nullable<IBiTreeNode<E>>) {
        if (this._right) {
            this.children.collectionRemove(this._right)
        }
        if (v) {
            this.children.collectionAdd(v)
        }
    }
}