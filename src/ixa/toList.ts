
import IList from "../data-structure/linear/IList";
import LinkedList from "../data-structure/linear/LinkedList";
import UIterable from "../data-structure/UIterable";
import getIterator from "./getIterator";

export default function toList<E>(i: UIterable<E>, reverse: boolean = false): IList<E> {

    const list = new LinkedList<E>();
    const iterator = getIterator<E>(i)

    while (iterator.hasNext()) {
        if (reverse) {
            list.listInsert(0, iterator.next());
        } else {
            list.stackPush(iterator.next());
        }
    }

    return list;
}