/*
 * asIterable.ts
 * Created on Tue Mar 30 2021 10:02:04
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

import treeForEach from "./treeForEach";
import IIterable from "../IIterable";
import LinkedList from "../linear/LinkedList";
import Tree from "./Tree";
import TreeTraversingStrategy from "./TreeTraversingStrategy";

export default function asIterable<E>(tree: Tree<E>, strategy: TreeTraversingStrategy): IIterable<E> {
    const list = new LinkedList<E>()
    treeForEach(tree, (e) => list.listAdd(e), "in-order")
    return list
}