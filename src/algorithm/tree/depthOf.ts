/*
 * depthOf.ts
 * Created on Mon Mar 15 2021 15:32:08
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

import Tree from "../../data-structure/tree/Tree";
import toTreeNode from "../../data-structure/tree/toTreeNode";

export default function depthOf<E>(tree: Tree<E>): number {
    const node = toTreeNode(tree)
    if (node === null) {
        return 0;
    }
    let max = 0;
    for (let i = 0; i < (node.children?.listSize() ?? 0); i++) {
        const d = depthOf(node.children?.listGet(i));
        if (d > max) {
            max = d;
        }
    }
    return max + 1;
}