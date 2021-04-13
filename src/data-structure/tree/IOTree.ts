import { IIterable } from "..";
import IArrayLike from "../../IArrayLike";

export default interface IOTree<E> {
    
    readonly root: E;

    all(): IIterable<E>;
    childrenOf(e: E): IIterable<E>;

    parentOf(e: E): E;
    addChildFor(root: E): void;
    removeChildFor(root: E): void;
}