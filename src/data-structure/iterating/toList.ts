import IIterable from "../IIterable";
import IList from "../linear/IList";
import LinkedList from "../linear/LinkedList";

export default function toList<E>(i: IIterable<E>, reverse: boolean = false): IList<E> {
    const list = new LinkedList<E>();
    const iterator = i.getIterator();
    while (iterator.hasNext()) {
        if (reverse) {
            list.listInsert(0, iterator.next());
        } else {
            list.listAdd(iterator.next());
        }
    }
    return list;
}