import BTreeNode from "./BTreeNode";
//TODO need to be tested.
export default function <E>(args: E[]): BTreeNode<E> {
    if (args.length === 0) {
        throw "there's no elements.";
    }
    const root = new BTreeNode<E>(args.shift()!);
    f(root, args);
    return root;
}
export function f<E>(root: BTreeNode<E> | null, restElements: E[]): void {
    if (root === null || restElements.length === 0) {
        return;
    }
    if (restElements.length > 1) {
        root.lchild = new BTreeNode<E>(restElements.shift()!);
    }
    if (restElements.length > 1) {
        root.rchild = new BTreeNode<E>(restElements.shift()!);
    }
    f(root.lchild!, restElements);
    f(root.rchild!, restElements);
}