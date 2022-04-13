/*
 * HashMap.ts
 * Created on Mon Mar 15 2021 15:53:10
 *
 * Description: 
 *   HashMap which turn to HashMap in JDK 1.7
 *
 * Copyright (c) 2021 tdscore
 * 
 * Copyright (c) 2021 Seymour Zhang and all contributors of this project.
 * tdscore is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import DSArray from "../../DSArray";
import IMap, { IReadonlyKeyValuePair } from "./IMap";
import _hashCode from "../../util/hashing/hash"
import HashMapEntry from "./HashMapEntry";
import MapBase from "./MapBase";
import equals from "../../dsEquals";

const DEFAULT_INITIAL_CAPCITY = 16;
const DEFAULT_LOAD_FACTOR = 0.75;
const MAXIMUM_CAPCITY = 1 << 30;
const EMPTY_TABLE: DSArray<any> = new DSArray(0);

export default class HashMap<K, V> extends MapBase<K, V> implements IMap<K, V>{

    private table: DSArray<HashMapEntry<K, V> | null>;
    private _size: number;
    private _loadFactor: number;
    private threshold: number;
    private hashSeed: number;
    private version: number;
    private lastUpdateVersion: number;

    private keys: DSArray<K>;
    private values: DSArray<V>;
    private kvs: DSArray<IReadonlyKeyValuePair<K, V>>;

    constructor(initialCapcity = DEFAULT_INITIAL_CAPCITY, loadFactor = DEFAULT_LOAD_FACTOR) {
        super();
        this._size = 0
        this.version = 0
        this.lastUpdateVersion = -1
        this._loadFactor = loadFactor <= 0 || loadFactor >= 1 ? DEFAULT_LOAD_FACTOR : loadFactor;
        this.threshold = Math.max(DEFAULT_INITIAL_CAPCITY, initialCapcity);
        // this,
        this.hashSeed = Math.random() * 24010 * this.threshold;

        this.table = EMPTY_TABLE;

        this.keys = new DSArray(0);
        this.values = new DSArray(0);
        this.kvs = new DSArray(0);
    }

    collectionClear(): void {
        for (let i = 0; i < this.table.length; i++) {
            this.table[i] = null;
        }
        this._size = 0;
    }
    collectionAny(): IReadonlyKeyValuePair<K, V> {
        if (this.size() === 0) {
            throw new Error("There's no element");
        }
        return this.getIterator().next();
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
    mapGetPairs(): DSArray<IReadonlyKeyValuePair<K, V>> {
        this.refreshCacheIfNeed();
        return this.kvs;
    }

    mapRemove(key: K): boolean {

        if (EMPTY_TABLE.referenceEquals(this.table)) {
            this.inflateTable(this.threshold);
        }

        const h = this.hash(key);
        const i = this.indexFor(h, this.table.length);
        const bucket = this.table[i];

        if (bucket) {
            if (equals(bucket.key, key)) {
                this.table[i] = bucket.next;
            } else {
                const [prevNode,] = this.findNodeInBucketByKey(bucket, h, key);
                if (prevNode !== null) {
                    prevNode.next = prevNode?.next?.next ?? null;
                }
            }
            this.version++;
            this._size--;
            return true;
        }
        return false;
    }


    mapPut(key: K, value: V): V | null {

        if (EMPTY_TABLE.referenceEquals(this.table)) {
            this.inflateTable(this.threshold)
        }

        const hash = this.hash(key)
        const bucket = this.table[this.indexFor(hash, this.table.length)]
        const [, node] = this.findNodeInBucketByKey(bucket, hash, key)

        if (node) {
            const oldValue = node.value
            node.key = key
            node.hash = hash
            node.value = value
            return oldValue
        } else {
            this.addNode(hash, bucket, key, value);
            return null;
        }
    }

    private findNodeInBucketByKey(bucket: HashMapEntry<K, V> | null, hash: number, key: K):
        [HashMapEntry<K, V> | null, HashMapEntry<K, V> | null] {
        let parent: HashMapEntry<K, V> | null = null
        let e: HashMapEntry<K, V> | null = null
        for (e = bucket; e !== null; e = e.next) {
            if (key && e.key) {
                if (hash === e.hash && equals(key, e.key)) {
                    return [parent, e]
                }
            } else {
                if (equals(key, e.key)) {
                    return [parent, e]
                }
            }
            parent = e
        }
        return [parent, e]
    }

    mapGet(key: K): V | null {

        if (EMPTY_TABLE.referenceEquals(this.table)) {
            return null;
        }
        const hash = this.hash(key);
        const bucket = this.findBucket(hash);
        const [, node] = this.findNodeInBucketByKey(bucket, hash, key)
        return node?.value ?? null
    }

    size(): number {
        return this._size;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }
    
    toArray(): DSArray<IReadonlyKeyValuePair<K, V>> {
        return this.mapGetPairs();
    }

    // getIterator(): IIterator<KeyValuePair<K, V>> {
    //     return this.mapGetPairs().getIterator();
    // }


    /**
     * inflate the table.
     * @param toSize 
     */
    private inflateTable(toSize: number) {
        const capcity = HashMap.roundUpToPowerOf2(toSize);
        const newTable = this.newTable(capcity);
        this.transfer(newTable);
        this.threshold = Math.min(capcity * this._loadFactor, MAXIMUM_CAPCITY + 1);
        this.table = newTable;
        this.hashSeed = Math.random() * (Number.MAX_VALUE / 2);
    }

    /**
     * 
     * Find the number which is power of 2 and bigger than num at one 2 times.
     * 
     * @param num 
     * @returns 
     */
    private static roundUpToPowerOf2(num: number) {
        if (num % 2 === 0) {
            return num;
        } else {
            const times = (Math.log2(num) + 1);
            return Math.pow(2, times);
        }
    }

    /**
     * Get the correspoding bucket object of hash.
     * 
     * @param hash 
     * @returns 
     */
    private findBucket(hash: number) {
        const i = this.indexFor(hash, this.table.length);
        return this.table[i];
    }

    /**
     * 
     * Get the index of bucket which could store 
     * the element which hashcode is the ceterin value. 
     * 
     * @param hash 
     * @param tableLength 
     * @returns 
     */
    private indexFor(hash: number, tableLength: number): number {
        return hash & (tableLength - 1);
    }

    /**
     * 
     * Insert node into the correspoding bucket.
     * 
     * @param hash 
     * @param bucket 
     * @param key 
     * @param value 
     */
    private addNode(hash: number, bucket: HashMapEntry<K, V> | null, key: K, value: V) {
        if (this.reachResizeThreshold()) {
            this.resize(this.table.length * 2);
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

    /**
     * 
     * Check if the size reached the threshold to 
     * trigger the operation of resize()
     * 
     * @returns 
     */
    private reachResizeThreshold() {
        return this._size >= this.threshold;
    }

    /**
     * 
     * Expand the hash table to a new safe size.
     * Transfer elements in old bucketes(hash table) into new buckets(hash table),
     * and discard the elder.
     * 
     * @param newCapcity 
     */
    private resize(newCapcity: number) {
        if (newCapcity > MAXIMUM_CAPCITY) {
            this._loadFactor = Number.MAX_VALUE;
        }

        const newBuckets = this.newTable(newCapcity);
        this.transfer(newBuckets, false);
        this.table = newBuckets;
        this.threshold = newCapcity * this._loadFactor;
    }

    /**
     * 
     * Create a new empty hash table for storing buckets.
     * 
     * @param newSize 
     * @returns 
     */
    private newTable(newSize: number): DSArray<HashMapEntry<K, V> | null> {
        return new DSArray<HashMapEntry<K, V> | null>(newSize, null);
    }

    /**
     * Transfer elements in current buckets into new buckets.
     * @param dest 
     * @param rehash 
     */
    private transfer(dest: DSArray<HashMapEntry<K, V> | null>, rehash = false) {
        for (let i = 0; i < this.table.length; i++) {
            let current: HashMapEntry<K, V> | null = this.table[i]
            while (current !== null) {
                current.hash = rehash ? this.hash(current.key) : current.hash
                const i = this.indexFor(current.hash, dest.length)
                const bucket = dest[i]
                const newNode = new HashMapEntry(current.hash, current.key, current.value)
                if (bucket) {
                    newNode.next = bucket
                }
                dest[i] = newNode
                current = current.next;
            }
        }
    }

    toString(): string {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private hash(key: any): number {
        let h = this.hashSeed;
        h ^= _hashCode(key);
        return h
    }
}