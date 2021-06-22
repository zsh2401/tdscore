import HashMap from "../data-structure/map/HashMap";
import IMap from "../data-structure/map/IMap";
import UIterable from "../data-structure/UIterable";
import getIterator from "./getIterator";

export type Covertor<K, V> = (v: V) => K;
export default function toMap<K, E>(i: UIterable<E>, covertor: Covertor<K, E>): IMap<K, E> {
    const map = new HashMap<K, E>()
    const iterator = getIterator<E>(i)
    while (iterator.hasNext()) {
        const v = iterator.next()
        const k = covertor(v)
        map.mapPut(k, v)
    }
    return map;
}