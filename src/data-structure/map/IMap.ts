import DSArray from "../../DSArray";
import ICollection from "../ICollection";

export interface KeyValuePair<K, V> {
    key: K;
    value: V;
}
export interface ReadonlyKeyValuePair<K, V> {
    readonly key: K;
    readonly value: V;
}
export default interface IMap<K, V> extends ICollection<ReadonlyKeyValuePair<K, V>> {
    mapPut(key: K, value: V): V | null;
    mapGet(key: K): V | null;
    mapRemove(key: K): void;
    mapGetKeys(): DSArray<K>;
    mapGetValues(): DSArray<V>;
    mapGetPairs(): DSArray<ReadonlyKeyValuePair<K, V>>;
}