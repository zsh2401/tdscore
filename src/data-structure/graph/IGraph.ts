/*
 * IGraph.ts
 * Created on Wed Apr 07 2021 19:19:29
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
import IGraphEdge from "./IGraphEdge";

export default interface IGraph<E> {

    readonly vertices: IIterable<E>
    readonly edges: IIterable<IGraphEdge<E>>

    addVertix(e: E): void
    removeVertix(e: E): void

    addEdge(from: E, to: E, weight?: number): void
    removeEdge(from: E, to: E): void

    inOf(e: E): IIterable<E>
    outOf(e: E): IIterable<E>

    weightOf(from: E, to: E): number
}