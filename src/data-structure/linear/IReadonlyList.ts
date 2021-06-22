import IIterable from "../IIterable";

export default interface IReadonlyList<E> extends IIterable<E> {
    listGet(position: number): E;
    listSize(): number;
    listIsEmpty(): boolean;
}