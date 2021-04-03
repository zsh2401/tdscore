import IBiTreeNode from "../../data-structure/tree/IBiTreeNode";
import Nullable from "../../Nullable";

/*
 * bstFindMax.ts
 * Created on Sat Apr 03 2021 16:09:29
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
/**
 * 在二叉查找树中搜索最大值
 * @param bst 
 */
export default function findMax<E>(bst: IBiTreeNode<E>): Nullable<IBiTreeNode<E>> {
    if (bst.right === null) {
        return bst
    }
    return findMax(bst.right)
}