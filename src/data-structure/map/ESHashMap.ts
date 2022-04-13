import IIterable from "../IIterable";
import dsEquals from "../../dsEquals";
import uuid from "../../math/uuid";
import dsHashCode from "../../util/hashing";
import Chain from "../../ixa//Chain";
import fromESIterator from "../../ixa//fromESIterator"
import UngrowableArrayList from "../linear/UngrowableArrayList";
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
        let i = 0
        for (const hashValue of this.idmap.keys()) {
            let idnode: IDNode<K> | null = this.idmap.get(hashValue) ?? null;
            while (idnode !== null) {
                try {
                    i++
                    result.listAdd(idnode.key)
                    idnode = idnode.next
                } catch (err) {
                    throw `${this.size()}-${i}`
                }

            }
        }
        return result
    }

    mapGetValues(): IIterable<V> {
        return fromESIterator(this.nmap.values())
    }

    mapGetPairs(): IIterable<IReadonlyKeyValuePair<K, V>> {
        return new Chain<K>(this.mapGetKeys())
            .select<IReadonlyKeyValuePair<K, V>>((key: K) => {
                return { key, value: this.mapGet(key)! }
            })
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
        const hkey = this.hash(key);
        let idnode: IDNode<K> | null = this.idmap.get(hkey) ?? null
        while (idnode !== null) {
            if (dsEquals(idnode.key, key)) {
                return idnode.id;
            }
            idnode = idnode.next
        }
        return null;
    }
}