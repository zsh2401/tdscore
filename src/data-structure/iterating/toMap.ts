import IIterable from "../IIterable"
import HashMap from "../map/HashMap";
import IMap from "../map/IMap";

export type Covertor<K, V> = (v: V) => K;
export default function toMap<K, E>(i: IIterable<E>, covertor: Covertor<K, E>): IMap<K, E> {
    const map = new HashMap<K, E>();
    const iterator = i.getIterator();
    while (iterator.hasNext()) {
        const v = iterator.next();
        const k = covertor(v);
        map.mapPut(k, v);
    }
    return map;
}