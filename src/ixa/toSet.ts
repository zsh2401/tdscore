import HashSet from "../data-structure/set/HashSet";
import ISet from "../data-structure/set/ISet";
import UIterable from "../data-structure/UIterable";
import getIterator from "./getIterator";

export default function toSet<E>(i: UIterable<E>): ISet<E> {
    const set = new HashSet<E>();
    const iterator = getIterator<E>(i)
    while (iterator.hasNext()) {
        set.setAdd(iterator.next());
    }
    return set;
}