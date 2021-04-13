import IIterable from "../IIterable";
import IList from "../linear/IList";
import LinkedList from "../linear/LinkedList";
import getIterator from "./getIterator";

export default function toList<E>(i: IIterable<E>, reverse: boolean = false): IList<E> {

    const list = new LinkedList<E>();
    const iterator = getIterator<E>(i)

    while (iterator.hasNext()) {
        if (reverse) {
            list.queueEn(iterator.next());
        } else {
            list.stackPush(iterator.next());
        }
    }

    return list;
}