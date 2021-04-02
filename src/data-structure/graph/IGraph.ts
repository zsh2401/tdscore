import dsHashCode from "../../hash";
import { IHashCodeGettable } from "../../util/hash";
import ICollection from "../ICollection";
import Edge from "./Edge";

export const DEFAULT_WEIGHT = 0;
export const INF_WEIGHT = Number.POSITIVE_INFINITY;

/**
 * The hash code of edge should always be edgeHashCodeOf(edge) 
 * otherwise some of algorithms won't work stably
 */
export interface IEdge<E> extends IHashCodeGettable {
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
export default interface IGraph<TElement, TEdge extends IEdge<TElement> = Edge<TElement>> {
    readonly vertices: ICollection<TElement>;
    readonly edges: ICollection<TEdge>;
}