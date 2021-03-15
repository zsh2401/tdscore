import { Action1 } from "../../Action";
import IArrayLike from "../../IArrayLike";
import { max } from "../../math";
import IList from "../linear/IList";

export default interface IUniTree<E> {
    root: IUniTreeNode<E> | null;
}
export interface IUniTreeNode<E> {
    parent: IUniTreeNode<E>;
    data: E;
    children: IList<IUniTreeNode<E>>;
}

export function depthOf<E>(tree: IUniTree<E> | IUniTreeNode<E>): number {

}
function _depthOf(tree: IUniTreeNode<any>, dep: number): number {
    dep += 1;
    dep += max(...tree.children.toJSArray().map(child => _depthOf(child, dep)));
    return dep;
}
export function leafsOf<E>(tree: IUniTree<E>): IArrayLike<E> {

}
export function countOf<E>(tree: IUniTree<E> | IUniTreeNode<E>): number {

}

export type TreeTraversingStrategies = "pre-order" | "post-order"
export function forEach<E>(tree: IUniTree<E> | IUniTreeNode<E>, consumer: Action1<E>,
    strategy: TreeTraversingStrategies = "pre-order"): void {

    const node = isTree(tree) ? tree.root : tree;
    if (node) {
        if (strategy === "pre-order") {
            consumer(node.data);
            node.children.forEach((child) => {
                forEach(child, consumer, strategy);
            });
        }

    }
}
function isTree<E>(tree: IUniTree<E> | IUniTreeNode<E> | null): tree is IUniTree<E> {
    //@ts-ignore
    return tree !== null && tree.root !== undefined;
}
