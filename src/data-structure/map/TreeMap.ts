import DSArray from "../../DSArray";
import DSObject from "../../DSObject";
import Ref from "../../Ref";
import hashCode from "../../util/hashing";
import { ReadonlyKeyValuePair } from "./IMap";
import { toDSArrayForItertable } from "../iterating";
import IList from "../linear/IList";
import LinkedList from "../linear/LinkedList";
import MapBase from "./MapBase";
//TODO waiting to be implemented.
export default class TreeMap<K, V> extends MapBase<K, V>{
    private root: Entry<K, V> | null = null;
    private _size: number = 0;
    private version: Ref<number> = new Ref<number>(0);
    private lastUpdatedVersion: number = 0;
    private cachedEntries: DSArray<Entry<K, V>> = new DSArray(0);
    constructor() {
        super();
    }
    mapGetKeys(): DSArray<K> {
        this.updateCacheIfNeed();
        return toDSArrayForItertable(this.cachedEntries, (entry) => {
            return entry.getKey()
        });
    }
    mapGetValues(): DSArray<V> {
        this.updateCacheIfNeed();
        return toDSArrayForItertable(this.cachedEntries, (entry) => {
            return entry.getValue()
        });
    }
    mapGetPairs(): DSArray<ReadonlyKeyValuePair<K, V>> {
        this.updateCacheIfNeed();
        return this.cachedEntries;
    }
    private updateCacheIfNeed() {
        if (this.lastUpdatedVersion !== this.version.value) {
            const entries = new LinkedList<Entry<K, V>>();
            this.preOrder(this.root, entries);
            this.cachedEntries = toDSArrayForItertable(entries);
            this.lastUpdatedVersion = this.version.value;
        }
    }
    private preOrder(root: Entry<K, V> | null, builder: IList<Entry<K, V>>) {
        if (root) {
            builder.listAdd(root);
            this.preOrder(root.lchild, builder);
            this.preOrder(root.rchild, builder);
        }
    }
    private fixAfterInsertion(x: Entry<K, V>) { }
    private rotateLeft(x: Entry<K, V>) { }
    private rotateRight(x: Entry<K, V>) { }
    private getEntry(key: K): Entry<K, V> | null {
        return null;
    }
    private deleteEntry(x: Entry<K, V>) { }
    mapPut(key: K, value: V): V | null {
        if (this.root === null) {
            this.root = new Entry(key, value, null!);
            this._size = 1;
            this.version.value++;
            return null;
        }
        throw new Error("Method not implemented.");
    }
    mapGet(key: K): V | null {
        const e = this.getEntry(key);
        return e === null ? null : e.getValue();
    }
    mapRemove(key: K): void {
        const e = this.getEntry(key);
        if (e !== null) {
            this.deleteEntry(e);
        }
    }
    size(): number {
        return this._size;
    }
    collectionClear(): void {
        this.root = null;
        this._size = 0;
        this.version.value++;
        this.cachedEntries = new DSArray(0);
        this.lastUpdatedVersion = this.version.value;
    }

}
class Entry<K, V> extends DSObject {
    key: K;
    value: V;
    lchild: Entry<K, V> | null = null;
    rchild: Entry<K, V> | null = null;
    parent: Entry<K, V>;
    color: "red" | "black" = "black";
    constructor(key: K, value: V, parent: Entry<K, V>) {
        super();
        this.key = key;
        this.value = value;
        this.parent = parent;
    }
    getKey() {
        return this.key;
    }
    setKey(key: K) {
        this.key = key;
    }
    setValue(value: V): V {
        const oldValue = this.value;
        this.value = value;
        return oldValue;
    }
    getValue(): V {
        return this.value;
    }
    getHashCode() {
        return hashCode(this.key) ^ hashCode(this.value);
    }
    toString() {
        return `${this.key}=${this.value}`
    }
}