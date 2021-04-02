import DSObject from "../../DSObject";
import HashSet from "../HashSet";
import ICollection from "../ICollection";
import IGraphNode, { IGraphNodeEdge } from "./IGraphNode";

export default class GraphNode<E>
    extends DSObject implements IGraphNode<E> {

    readonly in: ICollection<IGraphNodeEdge<E>>;
    readonly out: ICollection<IGraphNodeEdge<E>>;

    data: E;
    constructor(e: E) {
        super()
        this.data = e
        this.in = new HashSet()
        this.out = new HashSet()
    }

    to(node: IGraphNode<E>, weight: number) {
        node.in.collectionAdd({
            node: this,
            weight
        })
        this.out.collectionAdd({
            node,
            weight
        })
    }
}