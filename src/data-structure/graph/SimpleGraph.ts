import HashSet from "../set/HashSet";
import DSObject from "../../DSObject";
import SimpleEdge from "./SimpleEdge";
import IGraph, { IEdge } from "./IGraph";
import ISet from "../set/ISet";
import { IIterator } from "..";

export default class SimpleGraph
    <TElement, TEdge extends IEdge<TElement> = SimpleEdge<TElement>>
    extends DSObject
    implements IGraph<TElement, TEdge>{

    getIterator(): IIterator<TElement> {
        return this.vertices.getIterator()
    }

    readonly vertices: ISet<TElement> = new HashSet();
    readonly edges: ISet<TEdge> = new HashSet();

}