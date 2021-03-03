import { Action1 } from "../../Action";
import BTreeNode from "./BTreeNode";

export function preOrder<E>(btNode:BTreeNode<E> | null,vistor:Action1<E>){
    if(btNode !== null){
        vistor(btNode.data);
        preOrder(btNode.lchild,vistor);
        preOrder(btNode.rchild,vistor);
    }
}
export function inOrder<E>(btNode:BTreeNode<E> | null,vistor:Action1<E>){
    if(btNode !== null){
        inOrder(btNode.lchild,vistor);
        vistor(btNode.data);
        inOrder(btNode.rchild,vistor);
    }
}
export function postOrder<E>(btNode:BTreeNode<E> | null,vistor:Action1<E>){
    if(btNode !== null){
        postOrder(btNode.lchild,vistor);
        postOrder(btNode.rchild,vistor);
        vistor(btNode.data);
    }
}