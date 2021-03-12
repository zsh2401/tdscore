import HashSet  from "../../data-structure/HashSet";
import DSObject from "../../DSObject";
import ICollection from "../ICollection";
import IUniGraph, { DEFAULT_WEIGHT, IEdge } from "./IUniGraph";

class MartixGraphEdge<E> extends DSObject implements IEdge<E>{
    readonly from: E;
    readonly to: E;
    readonly weigth: number;
    constructor(from: E, to: E, w?: number) {
        super();
        this.from = from;
        this.to = to;
        this.weigth ??= DEFAULT_WEIGHT;
    }
}
export default class MartixGraph<E> extends DSObject implements IUniGraph<E>{
    private _vertices = new HashSet<E>();
    private _edges = new HashSet<IEdge<E>>();
    get vertices(): ICollection<E> {
        return this._vertices;
    }
    get edges(): ICollection<IEdge<E>> {
        return this._edges;
    }
}