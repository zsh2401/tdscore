import dsHashCode from "../../dsHashCode";
import ICollection from "../ICollection";

export const DEFAULT_WEIGHT = 0;
export const INF_WEIGHT = Number.POSITIVE_INFINITY;
/**
 * The hash code of edge should always be edgeHashCodeOf(edge) 
 * otherwise some of algorithms won't work stably
 */
export interface IEdge<E> {
    readonly from: E;
    readonly to: E;
    weigth?: number;
}
export function edgeHashCodeOf<E>(edge: IEdge<E>) {
    return dsHashCode(edge.from) ^ dsHashCode(edge.to) ^ dsHashCode(edge.weigth);
}
/**
 * G = (V,E)
 */
export default interface IUniGraph<E> {
    readonly vertices: ICollection<E>;
    readonly edges: ICollection<IEdge<E>>;
}