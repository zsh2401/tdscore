import ICollection from "../ICollection";
import UngrowableArrayList from "../linear/UngrowableArrayList";
import { Action1 } from "../../Action";
import { inOrder, preOrder,postOrder } from "./btorder";
import TreeNode from "./TreeNode";

export default class BTreeNode<E> extends TreeNode<E>{
    private readonly list;
    constructor(d: E) {
        super(d);
        this.list = <UngrowableArrayList<BTreeNode<E>>>this.children;
    }
    createChildrenCollection(): ICollection<BTreeNode<E>> {
        const a = new UngrowableArrayList<BTreeNode<E>>(2);
        a.listAdd(null!);
        a.listAdd(null!);
        return a;
    }
    get lchild(): BTreeNode<E> | null {
        return this.list.listGet(0);
    }
    get rchild(): BTreeNode<E> | null {
        return this.list.listGet(1);
    }
    set lchild(v: BTreeNode<E> | null) {
        this.list.listSet(0, v!);
    }
    set rchild(v: BTreeNode<E> | null) {
        this.list.listSet(1, v!);
    }

    preOrder(visitor:Action1<E>){
        preOrder(this,visitor);
    }
    inOrder(visitor:Action1<E>){
        inOrder(this,visitor);
    }
    postOrder(visitor:Action1<E>){
        postOrder(this,visitor);
    }
}