/*
 * treeForEachNode.ts
 * Created on Mon Mar 15 2021 15:35:41
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
import { ArrayList } from "../linear";
import IQueue from "../linear/IQueue";
import LinkedList from "../linear/LinkedList"
import Tree from "./Tree";
import ITreeNode from "./ITreeNode";
import toTreeNode from "./toTreeNode";
import TreeTraversingStrategy from "./TreeTraversingStrategy";
import IBTreeNode from "./IBTreeNode";

export default function forEachNode<E>(tree: Tree<E>,
    consumer: Action1<ITreeNode<E>>,
    strategy: TreeTraversingStrategy = "pre-order"): void {

    const node = toTreeNode(tree);
    if (!node) return

    switch (strategy) {

        case "pre-order":
            consumer(node);
            node.children.forEach((child) => {
                forEachNode(child, consumer, strategy);
            });
            break;

        case "in-order":
            if ((<IBTreeNode<E>>node).left !== void 0 &&
                (<IBTreeNode<E>>node).right !== void 0) {
                forEachNode((<IBTreeNode<E>>node).left, consumer, strategy)
                consumer(node)
                forEachNode((<IBTreeNode<E>>node).right, consumer, strategy)
            } else if (node.children.size() > 1) {

                const i = node.children.getIterator()

                i.hasNext() && forEachNode(i.next(), consumer, strategy)
                consumer(node)
                i.hasNext() && forEachNode(i.next(), consumer, strategy)

            } else {
                consumer(node);
            }
            break;

        case "post-order":
            node.children.forEach((child) => {
                forEachNode(child, consumer, strategy);
            });
            consumer(node);
            break;

        case "level-order":
        default:
            levelOrder(node, consumer);
            break;
    }

}
//TODO
function levelOrder<E>(_node: Tree<E>, visitor: Action1<ITreeNode<E>>) {
    const q: IQueue<[ITreeNode<E>, number]> = new LinkedList();
    const node = toTreeNode(_node)
    if (node === null) return;
    q.queueEn([node, 1]);
    while (!q.isEmpty()) {
        // console.log("?");
        const [n, l] = q.queueDe();
        // visitor(n.data,l);
        if (node.children) {
            const cIterator = node.children.getIterator();
            while (cIterator.hasNext()) {
                q.queueEn([cIterator.next(), l + 1]);
            }
        }
    }
}
