/*
 * bstFindMin.ts
 * Created on Sat Apr 03 2021 16:12:32
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

import IBiTreeNode from "../../data-structure/tree/IBiTreeNode"
import Nullable from "../../Nullable"

/**
 * 找出最小的节点
 * 
 * @param tree 
 * @returns 
 */
export default function findMin<E>(bst: IBiTreeNode<E>): Nullable<IBiTreeNode<E>> {
    if (bst.left === null) {
        return bst
    }
    return findMin(bst.left)
}