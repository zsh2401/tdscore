/*
 * bfs.ts
 * Created on Sat Mar 13 2021 01:21:02
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
 * Mulan Permissive Software License，Version 2
 */

import { Action1 } from "../../Action";
import dsEquals from "../../dsEquals";
import HashSet from "../HashSet";
import filter from "../iterating/filter";
import LinkedList from "../linear/LinkedList";
import IQueue from "../linear/IQueue";
import IGraph, { IEdge } from "./IGraph";
import IIterable from "../IIterable";

export default function bfs<E>(
    g: IGraph<E>,
    viewer: Action1<E>,
    first?: E) {

    if (g.vertices.size() === 0) {
        return;
    }

    const viewed: HashSet<E> = new HashSet();
    const queue: IQueue<E> = new LinkedList();
    const start = first === undefined ? g.vertices.collectionAny() : first;
    queue.queueEn(start);
    while (!queue.isEmpty()) {
        const current = queue.queueDe();
        viewer(current);
        viewed.add(current);
        const edgesIterator = edgesOf(current, g).getIterator();
        while (edgesIterator.hasNext()) {
            const edge = edgesIterator.next();
            if (viewed.contains(edge.to)) {
                continue;
            }
            queue.queueEn(edge.to);
        }
    }
}
function edgesOf<E>(vertex: E, g: IGraph<E>): IIterable<IEdge<E>> {
    const data = filter(g.edges, (_edge) => dsEquals(vertex, _edge.from));
    return data;
}