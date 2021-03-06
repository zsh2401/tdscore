import DSObject from "../DSObject";
import CollectionBase from "./CollectionBase";
import HashMap from "./map/HashMap";
import ICollection from "./ICollection";
import ISet from "./ISet";

const PRESENT = new DSObject();
export default class HashSet<E>
    extends CollectionBase<E>
    implements ISet<E>, ICollection<E>{
    private innerMap: HashMap<E, any>;
    constructor() {
        super();
        this.innerMap = new HashMap();
    }
    setAdd(e: E): void {
        this.add(e);
    }
    setRemove(e: E): boolean {
        return this.remove(e);
    }
    collectionClear(): void {
        this.innerMap.collectionClear();
    }
    collectionAdd(e: E): void {
        this.add(e);
    }
    collectionRemove(e: E): boolean {
        if (this.contains(e)) {
            this.remove(e);
            return true;
        } else {
            return false;
        }
    }
    toArray() {
        return this.innerMap.mapGetKeys();
    }
    getIterator() {
        return this.innerMap.mapGetKeys().getIterator();
    }
    size() {
        return this.innerMap.size();
    }
    contains(e: E) {
        return this.innerMap.mapGetKeys().contains(e);
    }
    isEmpty() {
        return this.innerMap.isEmpty();
    }
    add(e: E) {
        this.innerMap.mapPut(e, PRESENT);
    }
    remove(e: E): boolean {
        return this.innerMap.mapRemove(e);
    }
    toString(): string {
        let str = "";
        const iterator = this.getIterator();
        while(iterator.hasNext()){
            str += iterator.next() + " ";
        }
        return str;
    }
}