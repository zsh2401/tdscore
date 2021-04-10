import { DSArray } from "../..";
import { bstSearch, treeForEach } from "../../algorithm";
import IComparer from "../../algorithm/IComparer";
import { AvlBiTreeNode, avlDelete, avlInsert } from "../../algorithm/tree/avltree";
import { toDSArray } from "../../IArrayLike";
import Nullable from "../../Nullable";
import { hash } from "../../util/hashing";
import { IReadonlyKeyValuePair, IKeyValuePair } from "./IMap";
import MapBase from "./MapBase";

/**
 * TreeMap<K,V> is based on AVL Tree
 */
export default class TreeMap<K, V> extends MapBase<K, V>{

    private root: Nullable<AvlBiTreeNode<IKeyValuePair<K, V>>> = null
    private readonly comparer: IComparer<K>
    private _size = 0;

    constructor(comparer: IComparer<K> = (a, b) => hash(a) - hash(b)) {
        super()
        this.comparer = comparer
    }

    mapGetKeys(): DSArray<K> {
        const r: K[] = []
        treeForEach(this.root, (kvp) => r.push(kvp.key))
        return toDSArray(r)
    }

    mapGetValues(): DSArray<V> {
        const r: V[] = []
        treeForEach(this.root, (kvp) => r.push(kvp.value))
        return toDSArray(r)
    }

    mapGetPairs(): DSArray<IReadonlyKeyValuePair<K, V>> {

        const r: IReadonlyKeyValuePair<K, V>[] = []
        treeForEach(this.root, (kvp) => r.push(kvp))
        return toDSArray(r)

    }

    mapPut(key: K, value: V): V | null {

        const sameKeyNode = bstSearch<IKeyValuePair<K, V>>(this.root, (e) => {
            return this.comparer(e.key,key)
        })

        if (sameKeyNode) {
            const oldValue = sameKeyNode.data.value
            sameKeyNode.data.value = value
            return oldValue
        } else {
            this.root = avlInsert(this.root, { key, value }, (a, b) => this.comparer(a.key, b.key))
            this._size++
            return value
        }
    }

    mapGet(key: K): V | null {

        const r = bstSearch<IKeyValuePair<K, V>>(this.root, (e) => {
            return this.comparer(e.key, key)
        })
        return r?.data?.value ?? null

    }

    mapRemove(key: K): void {
        try {
            this.root = avlDelete(this.root, { key, value: null! }, (a, b) => this.comparer(a.key, b.key))
            this._size--
        } catch (e) {

        }
    }

    size(): number {
        return this._size;
    }

    collectionClear(): void {
        this.root = null
        this._size = 0
    }

}