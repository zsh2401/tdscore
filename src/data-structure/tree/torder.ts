import IQueue from "../linear/IQueue";
import LinkedList from "../linear/LinkedList";
import {  Action2 } from "../../Action";
import TreeNode from "./TreeNode";
export function levelOrder<E>(node:TreeNode<E>,visitor:Action2<E,number>){
    const q: IQueue<[TreeNode<E>,number]> = new LinkedList();
    q.queueEn([node,1]);
    while(!q.isEmpty()){
        // console.log("?");
        const [n,l] = q.queueDe();
        // visitor(n.data,l);
        const cIterator = node.children.getIterator();
        while(cIterator.hasNext()){
            q.queueEn([cIterator.next(),l + 1]);
        }
    }
}