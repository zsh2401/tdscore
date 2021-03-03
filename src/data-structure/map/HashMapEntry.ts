import DSObject from "../../DSObject";
import _hashCode from "../../util/hash"
export default class HashMapEntry<K, V> extends DSObject {
    
    hash: number;
    value: V;
    key: K;
    next: HashMapEntry<K, V> | null;

    constructor(hash: number, key: K, value: V) {
        super();
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = null;
    }

    getHashCode() {
        return this.hash;
    }

    toString(){
        return `(<${this.hash}>[${this.key}:${this.value}])`;
    }
}