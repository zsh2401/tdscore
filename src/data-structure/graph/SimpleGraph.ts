import HashSet from "../set/HashSet";
import DSObject from "../../DSObject";
import ICollection from "../ICollection";
import Edge from "./Edge";
import IGraph, { DEFAULT_WEIGHT, IEdge } from "./IGraph";

export default class SimpleGraph
    <TElement, TEdge extends IEdge<TElement> = Edge<TElement>>
    extends DSObject
    implements IGraph<TElement, TEdge>{

    readonly vertices: ICollection<TElement> = new HashSet();
    readonly edges: ICollection<TEdge> = new HashSet();

}