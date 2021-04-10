import DSArray from "../../DSArray";
import IIterator from "../IIterator";
import toDSArray from "../iterating/toDSArrayForItertable";
import CollectionBase from "../CollectionBase";
import IMap, { IKeyValuePair, IReadonlyKeyValuePair } from "./IMap";
import equals from "../../equals";

/**
 * Map类型的基类
 */
export default abstract class MapBase<K, V>
    extends CollectionBase<IReadonlyKeyValuePair<K, V>> implements IMap<K, V> {

    collectionAdd(e: IReadonlyKeyValuePair<K, V>): void {
        this.mapPut(e.key, e.value);
    }

    collectionRemove(e: IReadonlyKeyValuePair<K, V>): boolean {
        if (equals(this.mapGet(e.key), e.value)) {
            this.mapRemove(e.key);
            return true;
        } else {
            return false;
        }
    }

    toArray(): DSArray<IReadonlyKeyValuePair<K, V>> {
        return toDSArray(this);
    }

    contains(o: IKeyValuePair<K, V>): boolean {
        const contained = this.mapGetKeys().contains(o.key);
        const valueIsCorrect = equals(this.mapGet(o.key), o.value);
        return contained && valueIsCorrect;
    }

    abstract mapGetKeys(): DSArray<K>;
    abstract mapGetValues(): DSArray<V>;
    abstract mapGetPairs(): DSArray<IReadonlyKeyValuePair<K, V>>;
    abstract mapPut(key: K, value: V): V | null;
    abstract mapGet(key: K): V | null;
    abstract mapRemove(key: K): void;
    abstract size(): number;

    isEmpty(): boolean {
        return this.size() == 0;
    }

    getIterator(): IIterator<IReadonlyKeyValuePair<K, V>> {
        const iterator = this.mapGetKeys().getIterator();
        const that = this;
        class I implements IIterator<IReadonlyKeyValuePair<K, V>>{
            reset(): void {
                iterator.reset();
            }

            hasNext(): boolean {
                return iterator.hasNext();
            }

            next(): IReadonlyKeyValuePair<K, V> {
                const key = iterator.next();
                return {
                    key,
                    value: that.mapGet(key)!
                };
            }

            current(): IReadonlyKeyValuePair<K, V> {
                const key = iterator.current();
                return {
                    key,
                    value: that.mapGet(key)!
                };
            }
        }
        return new I();
    }
    
}