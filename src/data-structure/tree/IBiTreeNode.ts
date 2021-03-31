/*
 * IBTreeNode.ts
 * Created on Mon Mar 29 2021 19:45:10
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
import ITreeNode from "./ITreeNode";

/**
 * 二叉树节点定义
 */
export default interface IBiTreeNode<E> extends ITreeNode<E> {
    /**
     * 左孩子
     */
    left: Nullable<IBiTreeNode<E>>

    /**
     * 右孩子
     */
    right: Nullable<IBiTreeNode<E>>
}