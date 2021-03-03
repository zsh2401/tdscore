import IIterable from "../IIterable";
import LinkedList from "../linear/LinkedList";
import DSArray from "../../DSArray";
import { Func2 } from "../../Func";

export default function filter<E>(iterable: IIterable<E>,
    filter: Func2<E, number, boolean>): DSArray<E> {
    const i = iterable.getIterator();
    const list = new LinkedList<E>();
    for (let index = 0; i.hasNext(); index++) {
        const v = i.next();
        if (filter(v, index)) {
            list.listAdd(v);
        }
    }
    return list.toArray();
}