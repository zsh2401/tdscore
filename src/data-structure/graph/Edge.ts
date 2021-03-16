import DSObject from "../../DSObject";
import { edgeHashCodeOf, IEdge } from "./IGraph";

export default class Edge<E> extends DSObject
    implements IEdge<E>{
        
    readonly from: E;
    readonly to: E;
    weigth?: number | undefined;
    constructor(from: E, to: E, weight?: number) {
        super();
        this.from = from;
        this.to = to;
        this.weigth = weight;
    }
    getHashCode(): number {
        return edgeHashCodeOf(this);
    }
}