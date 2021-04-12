import { IIterable } from "..";
import { dsEquals } from "../..";
import DSArray from "../../DSArray";
import { uuid } from "../../math";
import dsHashCode from "../../util/hashing";
import { Chain, fromESIterator } from "../iterating";
import { UngrowableArrayList } from "../linear";
import { IReadonlyKeyValuePair } from "./IMap";
import MapBase from "./MapBase";

type ID = string;
interface IDNode<K> {
    key: K
    id: ID
    next: IDNode<K> | null
}
export default class ESHashMap<K, V>
    extends MapBase<K, V>{

    private readonly nmap = new Map<ID, V>()
    private readonly idmap = new Map<number, IDNode<K>>()

    mapGetKeys(): IIterable<K> {
        const result = new UngrowableArrayList<K>(this.size())
        for (const hashValue of this.idmap.keys()) {
            let idnode: IDNode<K> | null = this.idmap.get(hashValue) ?? null;
            while (idnode !== null) {
                result.listAdd(idnode.key)
                idnode = idnode.next
            }
        }
        return result
    }

    mapGetValues(): IIterable<V> {
        return fromESIterator(this.nmap.values())
    }

    mapGetPairs(): IIterable<IReadonlyKeyValuePair<K, V>> {
        return new Chain(this.mapGetKeys())
            .select(key => {
                return { key, value: this.mapGet(key)! }
            })
            .asDSArray()
    }

    mapPut(key: K, value: V): V | null {
        let id: ID | null = this.getIdByKey(key)
        if (id === null) {
            id = this.insertKey(key)
            this.nmap.set(id, value)
            return null
        } else {
            const oldValue = this.nmap.get(id)
            this.nmap.set(id, value)
            return oldValue ?? null;
        }
    }

    mapGet(key: K): V | null {
        const id = this.getIdByKey(key)
        if (id === null) {
            return null
        } else {
            return this.nmap.get(id) ?? null
        }
    }

    mapRemove(key: K): boolean {
        const id = this.removeKey(key)
        if (id !== null) {
            return this.nmap.delete(id);
        }
        return false;
    }

    size(): number {
        return this.nmap.size
    }
    collectionClear(): void {
        this.nmap.clear()
    }

    private hash(key: K): number {
        return dsHashCode(key)
    }

    private insertKey(key: K): ID {

        const h = this.hash(key)
        if (this.idmap.has(h)) {
            const head: IDNode<K> = this.idmap.get(h)!;

            let idnode: IDNode<K> | null = head;
            while (idnode !== null) {
                if (dsEquals(idnode.key, key)) {
                    return idnode.id;
                }
                idnode = idnode.next
            }

            const newNode: IDNode<K> = {
                key,
                id: uuid(),
                next: head.next
            }
            head.next = newNode

            return newNode.id
        } else {

            const node: IDNode<K> = {
                key,
                id: uuid(),
                next: null
            }
            this.idmap.set(h, node)

            return node.id;
        }
    }

    private removeKey(key: K): ID | null {
        const h = this.hash(key)
        if (this.idmap.has(h)) {
            let idnode: IDNode<K> | null = this.idmap.get(h) ?? null
            while (idnode !== null) {
                if (dsEquals(idnode.key, key)) {
                    return idnode.id;
                }
                idnode = idnode.next
            }
        }
        return null
    }

    private getIdByKey(key: K): ID | null {
        let idnode: IDNode<K> | null = this.idmap.get(this.hash(key)) ?? null
        while (idnode !== null) {
            if (dsEquals(idnode.key, key)) {
                return idnode.id;
            }
            idnode = idnode.next
        }
        return null;
    }
}