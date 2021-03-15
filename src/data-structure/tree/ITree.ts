/*
 * ITree.ts
 * Created on Mon Mar 15 2021 15:38:04
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

import ITreeNode from "./ITreeNode";

export default interface ITree<E> {
    root: ITreeNode<E> | null;
}

export type UTree<E> = ITree<E> | ITreeNode<E> | null;
// export function leafsOf<E>(tree: ITree<E> | ITreeNode<E>): number {
//     let count = 0;
//     forEachNode(tree, (node) => {
//         if (node.children.size() === 0) {
//             count++;
//         }
//     });
//     return count;
// }
// export function countOf<E>(tree: ITree<E> | ITreeNode<E>): number {
//     let count = 0;
//     forEach(tree, () => count++)
//     return count;
// }

// export type TreeTraversingStrategies = "pre-order" | "post-order"

