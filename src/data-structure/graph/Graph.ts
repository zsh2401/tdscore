import HashSet from "../HashSet";
import DSObject from "../../DSObject";
import ICollection from "../ICollection";
import Edge from "./Edge";
import IUniGraph, { DEFAULT_WEIGHT, IEdge } from "./IUniGraph";

export default class Graph
    <TElement, TEdge extends IEdge<TElement> = Edge<TElement>>
    extends DSObject
    implements IUniGraph<TElement, TEdge>{

    readonly vertices: ICollection<TElement> = new HashSet();
    readonly edges: ICollection<TEdge> = new HashSet();

}