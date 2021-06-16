import IIterable from "../IIterable";
import HashSet from "../set/HashSet";
import ISet from "../set/ISet";
import UIterable from "../UIterable";
import getIterator from "./getIterator";

export default function toSet<E>(i: UIterable<E>): ISet<E> {
    const set = new HashSet<E>();
    const iterator = getIterator<E>(i)
    while (iterator.hasNext()) {
        set.setAdd(iterator.next());
    }
    return set;
}