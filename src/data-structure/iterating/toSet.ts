import IIterable from "../IIterable";
import HashSet from "../HashSet";
import ISet from "../ISet";

export default function toSet<E>(i:IIterable<E>):ISet<E>{
    const set = new HashSet<E>();
    const iterator = i.getIterator();
    while(iterator.hasNext()){
        set.setAdd(iterator.next());
    }
    return set;
}