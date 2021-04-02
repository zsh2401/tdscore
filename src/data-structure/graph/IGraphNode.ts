import ICollection from "../ICollection";

export interface IGraphNodeEdge<E> {
    node: IGraphNode<E>
    weight: number;
}

export default interface IGraphNode<E> {
    readonly in: ICollection<IGraphNodeEdge<E>>
    readonly out: ICollection<IGraphNodeEdge<E>>
    data: E
}