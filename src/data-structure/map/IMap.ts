import ICollection from "../ICollection";
import IIterable from "../IIterable";

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
    mapGetKeys(): IIterable<K>;
    mapGetValues(): IIterable<V>;
    mapGetPairs(): IIterable<IReadonlyKeyValuePair<K, V>>;
}