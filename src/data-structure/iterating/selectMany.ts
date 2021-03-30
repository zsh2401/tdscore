import IIterable from "../IIterable";
import LinkedList from "../linear/LinkedList";
export type Selector<E, V> = (e: E) => V;
export default function select<E, V>(i: IIterable<E>, selector: Selector<E, V>): IIterable<V> {
    const iterator = i.getIterator();
    const list = new LinkedList<V>();
    for (let i = 0; iterator.hasNext(); i++) {
        list.listAdd(selector(iterator.next()));
    }
    return list
}