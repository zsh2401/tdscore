import IBiTreeNode from "../../data-structure/tree/IBiTreeNode";
import Nullable from "../../Nullable";
import IDirectionIndicator from "../IDirectionIndicator";

/**
 * 二叉查找树搜索
 * @param tree
 * @param guider
 * @returns
 */

export default function bstSearch
    <N extends IBiTreeNode<E>, E>
    (tree: N | null, guider: IDirectionIndicator<E>): Nullable<IBiTreeNode<E>> {

    if (tree === null)
        return null;

    const cr = guider(tree.data);
    if (cr === 0) {
        return tree;
    } else if (cr > 0) {
        return tree.left ? bstSearch(tree.left, guider) : null;
    } else {
        return tree.right ? bstSearch(tree.right, guider) : null;
    }
}