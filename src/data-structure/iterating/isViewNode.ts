import IIterable from "../IIterable";
import ViewNode from "./ViewNode";

export default function isViewNode<E>(i:IIterable<E>):
 i is ViewNode<E>{
    return i instanceof ViewNode;
}