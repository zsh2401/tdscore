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
import ITree, { UTree } from "./ITree";
import ITreeNode from "./ITreeNode";
import toTreeNode from "./toTreeNode";
import TreeTraversingStrategy from "./TreeTraversingStrategy";

export default function forEachNode<E>(tree: ITree<E> | ITreeNode<E>,
    consumer: Action1<ITreeNode<E>>,
    strategy: TreeTraversingStrategy = "pre-order"): void {

    const node = toTreeNode(tree);

    if (node) {
        const children = node.children ? node.children : new ArrayList<ITreeNode<E>>(0);
        if (children.size() > 2 && strategy === "in-order") {
            throw new Error("In order traversing do not supports non-BinTree!");
        }
        switch (strategy) {

            case "pre-order":
                consumer(node);
                children.forEach((child) => {
                    forEachNode(child, consumer, strategy);
                });
                break;

            case "in-order":
                try {
                    forEachNode(children.listGet(0), consumer, strategy) //Left
                } finally { }
                consumer(node);
                try {
                    forEachNode(children.listGet(1), consumer, strategy) //Right
                } finally { }
                break;

            case "post-order":
                children.forEach((child) => {
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
}
function levelOrder<E>(_node: UTree<E>, visitor: Action1<ITreeNode<E>>) {
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
