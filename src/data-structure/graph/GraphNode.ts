import HashMap from "../map/HashMap";
import DSArray from "../../DSArray";
import DSObject from "../../DSObject";
import hashCode from "../../util/hash";
import IIterator from "../IIterator";

export const DEFAULT_WEIGTH = 0;
export const MAX_WEIGTH = Number.POSITIVE_INFINITY;
export class GraphNode<E> extends DSObject {
    constructor(data: E) {
        super();
        this._data = data;
    }
    collectionAdd(e: E): void {
        throw new Error("Method not implemented.");
    }
    collectionRemove(e: E): boolean {
        throw new Error("Method not implemented.");
    }
    collectionClear(): void {
        throw new Error("Method not implemented.");
    }
    size(): number {
        throw new Error("Method not implemented.");
    }
    isEmpty(): boolean {
        throw new Error("Method not implemented.");
    }
    toArray(): DSArray<E> {
        throw new Error("Method not implemented.");
    }
    contains(o: E): boolean {
        throw new Error("Method not implemented.");
    }
    getIterator(): IIterator<E> {
        throw new Error("Method not implemented.");
    }
    get data(): E {
        return this._data;
    }
    get out(): HashMap<GraphNode<E>, number> {
        return this._out;
    }
    get in(): HashMap<GraphNode<E>, number> {
        return this._in;
    }
    newHashCode() {
        let h = hashCode(this._data);
        h ^= this.out.getHashCode();
        h ^= this.in.getHashCode();
        h ^= hashCode("GraphNode");
        return h;
    }
    private readonly _data: E;
    private readonly _out: HashMap<GraphNode<E>, number> = new HashMap();
    private readonly _in: HashMap<GraphNode<E>, number> = new HashMap();
}