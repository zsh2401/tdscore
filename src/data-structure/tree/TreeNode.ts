import DSObject from "../../DSObject";
import ICollection from "../ICollection";
import HashSet from "../HashSet";
export type Tree<E> = TreeNode<E>;
export default class TreeNode<E> extends DSObject {

    private _data: E;
    readonly children: ICollection<TreeNode<E>>;

    constructor(data: E) {
        super();
        this._data = data;
        this.children = this.createChildrenCollection();
    }

    protected createChildrenCollection(): ICollection<TreeNode<E>> {
        return new HashSet();
    }

    get depth(): number {
        return TreeNode.depth(this);
    }
    public static depth<E>(tree: TreeNode<E> | null) {
        if (tree == null) {
            return 0;
        }
        let maxDepth = 0;
        const iterator = tree.children.getIterator();
        while (iterator.hasNext()) {
            const d = TreeNode.depth(iterator.next());
            if (d > maxDepth) {
                maxDepth = d;
            }
        }
        return maxDepth + 1;
    }

    get data(): E {
        return this._data;
    }
    set data(v: E) {
        this._data = v;
    }

}