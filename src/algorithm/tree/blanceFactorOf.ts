/*
 * blanceFactorOf.ts
 * Created on Sat Apr 03 2021 16:00:49
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

import depthOf from "./depthOf";
import IBiTreeNode from "../../data-structure/tree/IBiTreeNode";
;

/**
 * 计算二叉树的平衡因子
 * 正数则左边较重，0则完全平衡，负数则右边较重
 * 
 * @param tree
 * @returns
 */
export default function blanceFactorOf<E>(tree: IBiTreeNode<E> | null | undefined): number {
    if (!tree)
        return 0;
    return depthOf(tree.left) - depthOf(tree.right);
}
