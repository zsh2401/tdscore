/*
 * SetGraph.ts
 * Created on Wed Apr 07 2021 19:22:28
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

import IIterable from "../IIterable";
import DSArray from "../../DSArray";
import DSObject from "../../DSObject";
import equals from "../../equals";
import { IHashCodeGettable } from "../../util/hash";
import find from "../iterating/find";
import HashSet from "../set/HashSet";
import ISet from "../set/ISet"
import hashForEdge from "./hashForEdge";
import IGraph from "./IGraph";
import IGraphEdge from "./IGraphEdge";

/**
 * 基于HashSet存储的图，时间效率较高，但空间消耗较大
 */
export default class SetGraph<E> extends DSObject
    implements IGraph<E> {

    private readonly _vertices: ISet<E> = new HashSet()
    private readonly _edges: ISet<Edge<E>> = new HashSet()

    constructor() {
        super()
    }

    get vertices(): IIterable<E> {
        return this._vertices
    }

    get edges(): IIterable<IGraphEdge<E>> {
        return this._edges
    }

    addVertix(e: E): void {
        this._vertices.setAdd(e)
    }

    removeVertix(e: E): void {
        this._vertices.setRemove(e)
    }

    addEdge(from: E, to: E, weight: number = 0): void {
        if (!this._vertices.contains(from) || !this._vertices.contains(to)) {
            throw new Error("Invalid node.")
        }
        const e = new Edge(from, to, weight)
        this._edges.setAdd(e)
    }

    removeEdge(from: E, to: E): void {
        this._edges.setRemove(new Edge(from, to, 0))
    }

    inOf(e: E): IIterable<E> {
        if (!this._vertices.contains(e)) {
            return new DSArray<E>(0)
        }
        const r: E[] = []
        this._edges.forEach(_edge => {
            if (equals(e, _edge.to)) {
                r.push(_edge.from)
            }
        })
        return r
    }

    outOf(e: E): IIterable<E> {
        if (!this._vertices.contains(e)) {
            return new DSArray<E>(0)
        }
        const r: E[] = []
        this._edges.forEach(_edge => {
            if (equals(e, _edge.from)) {
                r.push(_edge.to)
            }
        })
        return r
    }

    weightOf(from: E, to: E): number {
        return find(this._edges, (_edge) => {
            return equals(_edge.from, from) && equals(_edge.to, to)
        })?.weight
            ??
            Number.POSITIVE_INFINITY
    }
}

class Edge<E> implements IHashCodeGettable, IGraphEdge<E> {
    readonly from: E;
    readonly to: E;
    weight: number;
    constructor(from: E, to: E, weight: number) {
        this.from = from
        this.to = to
        this.weight = weight
    }
    getHashCode(): number {
        return hashForEdge(this)
    }
}