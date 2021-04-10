import DSArray from "../../DSArray";
import ICollection from "../ICollection";

export interface IKeyValuePair<K, V> {
    key: K;
    value: V;
}
export interface IReadonlyKeyValuePair<K, V> {
    readonly key: K;
    readonly value: V;
}
export default interface IMap<K, V> extends ICollection<IReadonlyKeyValuePair<K, V>> {
    mapPut(key: K, value: V): V | null;
    mapGet(key: K): V | null;
    mapRemove(key: K): void;
    mapGetKeys(): DSArray<K>;
    mapGetValues(): DSArray<V>;
    mapGetPairs(): DSArray<IReadonlyKeyValuePair<K, V>>;
}