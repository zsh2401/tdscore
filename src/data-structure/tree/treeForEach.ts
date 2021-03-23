/*
 * treeForEach.ts
 * Created on Mon Mar 15 2021 15:36:55
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

import { Action1 } from "../../Action";

import Tree from "./Tree";
import forEachNode from "./treeForEachNode";
import TreeTraversingStrategy from "./TreeTraversingStrategy";

export default function forEach<E>(tree: Tree<E>, consumer: Action1<E>,
    strategy: TreeTraversingStrategy = "pre-order"): void {

    forEachNode<E>(tree, (node) => consumer(node.data), strategy)
    
}