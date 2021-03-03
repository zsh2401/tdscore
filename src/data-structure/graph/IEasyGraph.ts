import ICollection from "../ICollection";

export interface IEasyGraph<E> {
    nodes: ICollection<E>;
    relationships: ICollection<IGraphNodeConnection<E>>;
}
export interface IGraphNodeConnection<E> {
    a: E;
    b: E;
}