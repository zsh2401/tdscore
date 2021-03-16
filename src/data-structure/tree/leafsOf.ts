/*
 * countOf.ts
 * Created on Tue Mar 16 2021 21:06:08
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

import IArrayLike from "../../IArrayLike";
import { UTree } from "./ITree";
import forEachNode from "./treeForEachNode";

export default function leafsOf<E>(tree: UTree<E>): IArrayLike<E> {
    const result: E[] = [];
    forEachNode(tree, (node) => {
        if (node.children === null || node.children === undefined || node.children.size() === 0) {
            result.push(node.data)
        }
    });
    return result;
}