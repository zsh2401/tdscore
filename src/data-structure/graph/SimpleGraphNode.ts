/*
 * GraphNode.ts
 * Created on Tue Apr 06 2021 08:57:41
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

import DSObject from "../../DSObject";
import HashSet from "../set/HashSet";
import ICollection from "../ICollection";
import IGraphNode, { IGraphNodeEdge } from "./IGraphNode";

export default class SimpleGraphNode<E>
    extends DSObject implements IGraphNode<E> {

    readonly in: ICollection<IGraphNodeEdge<E>>;
    readonly out: ICollection<IGraphNodeEdge<E>>;

    data: E;
    constructor(e: E) {
        super()
        this.data = e
        this.in = new HashSet()
        this.out = new HashSet()
    }

    to(node: IGraphNode<E>, weight: number) {
        node.in.collectionAdd({
            node: this,
            weight
        })
        this.out.collectionAdd({
            node,
            weight
        })
    }
}