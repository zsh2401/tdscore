import IIterable from "../IIterable";
import ViewNode from "./ViewNode";

export default function toViewNode<E>(i:IIterable<E>): [ViewNode<E> | null ,ViewNode<E> | null]{
   if(isChain(i)){
        return [i,findLast(i)]
   }else{
       return newChain(i);
   }
}
function findLast<E>(first:ViewNode<E>):ViewNode<E>{
    while(first.next !== null){
        first = first.next;
    }
    return first;
}
function isChain<E>(i:IIterable<E>) :i is ViewNode<E>{
    return i instanceof ViewNode;
}
function newChain<E>(i:IIterable<E>):[ViewNode<E> | null ,ViewNode<E> | null]{
    let first : null | ViewNode<E> = null;
    let last : null | ViewNode<E> = null;
    const iterator = i.getIterator();
    if(iterator.hasNext()){
        last = new ViewNode(iterator.next());
        first = new ViewNode(iterator.next()); 
    }
    while(iterator.hasNext()){
        const current = new ViewNode(iterator.next());
        if(!iterator.hasNext()){
            last = current;
        }
    }
    return [first,last];
}