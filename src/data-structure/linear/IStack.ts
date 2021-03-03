import ICollection from "../ICollection";
import IIterable from "../IIterable";

export default interface IStack<E> extends ICollection<E>, IIterable<E> {
    stackPush(e: E): void;
    stackPop(): E;
    stackGetTop(): E;
}