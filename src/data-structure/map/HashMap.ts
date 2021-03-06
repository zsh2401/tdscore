import DSArray, { create } from "../../DSArray";
import IMap, { KeyValuePair, ReadonlyKeyValuePair } from "../IMap";
import _hashCode from "../../util/hash/hashcode"
import IIterator from "../IIterator";
import HashMapEntry from "./HashMapEntry";
import MapBase from "./MapBase";
import { Func1 } from "../../Func";

const DEFAULT_INITIAL_CAPCITY: number = 16;
const DEFAULT_LOAD_FACTOR = 0.75;
const MAXIMUM_CAPCITY = 1 << 30;
const EMPTY_TABLE: DSArray<any> = create<any>(0);

export default class HashMap<K, V> extends MapBase<K, V> implements IMap<K, V>{

    private table: DSArray<HashMapEntry<K, V> | null>;
    private _size: number = 0;
    private _loadFactor: number;
    private threshold: number;
    private hashSeed: number;
    private version: number = 0;
    private lastUpdateVersion: number = -1;

    private keys: DSArray<K>;
    private values: DSArray<V>;
    private kvs: DSArray<ReadonlyKeyValuePair<K, V>>;

    constructor(initialCapcity = DEFAULT_INITIAL_CAPCITY, loadFactor = DEFAULT_LOAD_FACTOR) {
        super();
        this._loadFactor = loadFactor <= 0 || loadFactor >= 1 ? DEFAULT_LOAD_FACTOR : loadFactor;
        this.threshold = Math.max(DEFAULT_INITIAL_CAPCITY, initialCapcity);
        // this,
        this.hashSeed = Math.random() * 24010 * this.threshold;
        //@ts-ignore
        this.table = EMPTY_TABLE;

        this.keys = new DSArray(0);
        this.values = new DSArray(0);
        this.kvs = new DSArray(0);
    }

    collectionClear(): void {
        for (let i = 0; i < this.table.length; i++) {
            this.table[i] = null;
        }
    }
    collectionAny(): ReadonlyKeyValuePair<K, V> {
        // if(this.)
        throw new Error("Method not implemented.");
    }
    private refreshCacheIfNeed() {
        if (this.version === this.lastUpdateVersion) {
            return;
        }
        const size = this.size();
        this.keys = new DSArray(size);
        this.values = new DSArray(size);
        this.kvs = new DSArray(size);
        let count = 0;
        for (let iBucket = 0; iBucket < this.table.length; iBucket++) {
            let node = this.table[iBucket];
            while (node !== null) {
                const i = count++;
                this.keys[i] = node.key;
                this.values[i] = node.value;
                this.kvs[i] = {
                    key: node.key,
                    value: node.value
                }
                node = node.next;
            }
        }
        this.lastUpdateVersion = this.version;
    }
    mapGetKeys(): DSArray<K> {
        this.refreshCacheIfNeed();
        return this.keys;
    }
    mapGetValues(): DSArray<V> {
        this.refreshCacheIfNeed();
        return this.values;
    }
    mapGetPairs(): DSArray<ReadonlyKeyValuePair<K, V>> {
        this.refreshCacheIfNeed();
        return this.kvs;
    }

    mapRemove(key: K): boolean {
        //@ts-ignore
        if (EMPTY_TABLE.referenceEquals(this.table)) {
            this.inflateTable(this.threshold);
        }

        const h = this.hash(key);
        const i = this.indexFor(h, this.table.length);
        const bucket = this.table[i];

        if (bucket) {
            if (bucket.key === key) {
                this.table[i] = bucket.next;
            } else {
                const prevFinder = (it: HashMapEntry<K, V>) => {
                    if (key === null && it.next && it.next.key === null) {
                        return true;
                    } else if (key !== null && it.next && it.next.hash === h) {
                        return true;
                    }
                    return false;
                };
                const prevNode = this.findNodeInBucket(bucket, prevFinder);
                prevNode!.next = prevNode?.next?.next ?? null;
            }
            this.version++;
            this._size--;
            return true;
        }
        return false;
    }


    mapPut(key: K, value: V): V | null {
        //@ts-ignore
        if (EMPTY_TABLE.referenceEquals(this.table)) {
            this.inflateTable(this.threshold);
        }

        const hash = this.hash(key);
        const bucket = this.table[this.indexFor(hash, this.table.length)];
        const nodeFinder = (it: HashMapEntry<K, V>) => {
            const foundNullNode = key === null && it.key === null;
            const foundHashNode = key !== null && it.key !== null && it.hash === hash;
            return foundNullNode || foundHashNode;
        };
        const node = this.findNodeInBucket(bucket, nodeFinder);

        if (node) {
            const oldValue = node.value;
            node.key = key;
            node.value = value;
            return oldValue;
        } else {
            this.addNode(hash, bucket, key, value);
            return null;
        }
    }

    mapGet(key: K): V | null {
        //@ts-ignore
        if (EMPTY_TABLE.referenceEquals(this.table)) {
            return null;
        }
        const hash = this.hash(key);
        const bucket = this.findBucket(hash);
        return this.findNodeInBucket(bucket, (it: HashMapEntry<K, V>) => {

            const foundNullKey = (key === null && it.key === null);
            const hashOK = (key !== null && it.key !== null && hash === it.hash);
            // console.log(`Finding: ${key}  Current:${it.key} foundNullKey:${foundNullKey} hashOK:${hashOK}`);
            return foundNullKey || hashOK;
        })?.value ?? null;
    }

    size(): number {
        return this._size;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }
    toArray() {
        return this.mapGetPairs();
    }

    getIterator(): IIterator<KeyValuePair<K, V>> {
        return this.mapGetPairs().getIterator();
    }


    private inflateTable(toSize: number) {
        const capcity = HashMap.roundUpToPowerOf2(toSize);
        const newTable = this.newTable(capcity);
        this.transfer(newTable);
        this.threshold = Math.min(capcity * this._loadFactor, MAXIMUM_CAPCITY + 1);
        this.table = newTable;
        this.hashSeed = Math.random() * (Number.MAX_VALUE / 2);;
    }

    private static roundUpToPowerOf2(num: number) {
        if (num % 2 === 0) {
            return num;
        } else {
            const times = (Math.log2(num) + 1);
            return Math.pow(2, times);
        }
    }
    private findBucket(hash: number) {
        const i = this.indexFor(hash, this.table.length);
        return this.table[i];
    }
    private indexFor(hash: number, tableLength: number): number {
        return hash & (tableLength - 1);
    }

    private addNode(hash: number, bucket: HashMapEntry<K, V> | null, key: K, value: V) {
        if (this.reachResizeThreshold()) {
            this.resize(this.table.length * 2);
            hash = this.hash(key);
            const i = this.indexFor(hash, this.table.length);
            bucket = this.table[i];
        }

        const newNode = new HashMapEntry(hash, key, value);
        if (bucket) {
            newNode.next = bucket.next;
            bucket.next = newNode;
        } else {
            this.table[this.indexFor(hash, this.table.length)] = newNode;
        }
        this.version++;
        this._size++;
    }

    private reachResizeThreshold() {
        return this._size >= this.threshold;
    }

    private resize(newCapcity: number) {
        if (newCapcity > MAXIMUM_CAPCITY) {
            this._loadFactor = Number.MAX_VALUE;
        }

        const newBuckets = this.newTable(newCapcity);
        this.transfer(newBuckets, false);
        this.table = newBuckets;
        this.threshold = newCapcity * this._loadFactor;
    }

    private newTable(newSize: number): DSArray<HashMapEntry<K, V> | null> {
        return new DSArray<HashMapEntry<K, V> | null>(newSize, null);
    }

    private findNodeInBucket(bucket: HashMapEntry<K, V> | null,
        finder: Func1<HashMapEntry<K, V>, boolean>): HashMapEntry<K, V> | null {

        while (bucket !== null) {
            if (finder(bucket)) {
                return bucket;
            }
            bucket = bucket.next;
        }
        return null;

    }

    //TODO transfer() used infinity time.
    private transfer(dest: DSArray<HashMapEntry<K, V> | null>, rehash: boolean = true) {
        for (let i = 0; i < this.table.length; i++) {
            let current: HashMapEntry<K, V> | null = this.table[i];
            while (current !== null) {
                current.hash = rehash ? this.hash(current.key) : current.hash;
                const i = this.indexFor(current.hash, dest.length);
                if (dest[i] !== null) {
                    dest[i]!.next = current;
                } else {
                    dest[i] = current;
                }
                current = current.next;
            }
        }
    }
    toString() {
        let chainStr = "";
        let notUsed = 0;
        let maximumLength = 0;
        for (let i = 0; i < this.table.length; i++) {
            chainStr += `[${i}]:\t`;
            let node = this.table[i];
            if (!node) {
                chainStr += "-\n"
                notUsed++;
            } else {
                let chainLength = 0;
                while (node !== null) {
                    chainLength++;
                    chainStr += `{ #${node.hash} (${node.key}):(${node.value}) }`
                    if (node.next) {
                        chainStr += " -> "
                    } else {
                        chainStr += "\n"
                    }
                    node = node.next;
                }
                if (chainLength > maximumLength) {
                    maximumLength = chainLength;
                }
            }
        }
        let headStr = `${super.toString()}\n`
        headStr += `Node Count: ${this.size()}\tBuckets: ${this.table.length - notUsed}/${this.table.length}\n`
        headStr += `Load Factor: ${this._loadFactor}\tThreshold: ${this.threshold}\n`
        headStr += `Max Chain Length: ${maximumLength}\n`
        headStr += `Bucket\tChain\n`;
        return headStr + chainStr;
    }
    private hash(key: any): number {
        let h = this.hashSeed;
        h ^= _hashCode(key);
        return h
    }
}