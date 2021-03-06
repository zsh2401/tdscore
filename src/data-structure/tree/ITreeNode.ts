/*
 * ITreeNode.ts
 * Created on Mon Mar 15 2021 15:37:25
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
import IList from "../linear/IList";


/**
 * 树节点的数据结构表示
 */
export default interface ITreeNode<E> {
    /**
     * 父节点
     */
    parent: Nullable<ITreeNode<E>>

    /**
     * 元素
     */
    data: E;

    /**
     * 有序的子节点集合
     */
    readonly children: IList<ITreeNode<E>>;
}