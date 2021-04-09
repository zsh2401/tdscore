import DSObject from "../../DSObject";
import equals from "../../equals";
import { IHashCodeGettable } from "../../util/hashing";
import hashForEdge from "./hashForEdge";
import IGraphEdge from "./IGraphEdge";

export default class Edge<E> extends DSObject implements IHashCodeGettable, IGraphEdge<E> {

    readonly from: E;
    readonly to: E;
    weight: number;

    constructor(from: E, to: E, weight: number) {
        super();
        this.from = from;
        this.to = to;
        this.weight = weight;
    }

    getHashCode(): number {
        return hashForEdge(this);
    }

    equals(other: any) {
        if (other instanceof Edge) {
            return equals(other.from, this.from) && equals(this.to, other.to);
        } else {
            return super.equals(other);
        }
    }

    toString(){
        return `Edge<${this.from},${this.to},${this.weight}>`
    }
}
