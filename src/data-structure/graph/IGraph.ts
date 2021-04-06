/*
 * IGraph.ts
 * Created on Tue Apr 06 2021 08:57:32
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

import dsHashCode from "../../hash";
import { IHashCodeGettable } from "../../util/hash";
import IIterable from "../IIterable";
import ISet from "../set/ISet";

export const DEFAULT_WEIGHT = 0;
export const INF_WEIGHT = Number.POSITIVE_INFINITY;

/**
 * The hash code of edge should always be edgeHashCodeOf(edge) 
 * otherwise some of algorithms won't work stably
 */
export interface IEdge<E>
    extends IHashCodeGettable {

    readonly from: E;
    readonly to: E;
    weigth?: number;

}

/**
 * The universal hashcode function of all objects implemented IEdge<E> .
 * @param edge 
 * @returns 
 */
export function edgeHashCodeOf<E>(edge: IEdge<E>): number {
    return dsHashCode(edge.from) ^ dsHashCode(edge.to) ^ dsHashCode(edge.weigth);
}

/**
 * G = (V,E)
 */
export default interface IGraph
    <TElement, TEdge extends IEdge<TElement> = IEdge<TElement>>
    extends IIterable<TElement> {

    readonly vertices: ISet<TElement>
    readonly edges: ISet<TEdge>
}