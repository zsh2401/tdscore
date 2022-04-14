import IIterable from "../../data-structure/IIterable";
import IIterator from "../../data-structure/IIterator";
import getIterator from "../../ixa/getIterator";
import Matrix from "./Matrix";
import Transformation from "./Transformation";

export default class Vector
    extends Matrix
    implements IIterable<number>

{
    constructor(...e: number[]) {
        super(Vector.toMatrix(e));
    }

    private static toMatrix(e: number[]): number[][] {
        return e.map(n => [n]);
    }

    transform(t: Transformation): Vector {
        const m = this.mul(t);
        const jsm = m.toArray();
        const a = jsm.map(e => e[0]);
        return new Vector(...a);
    }

    getIterator(): IIterator<number> {
        return getIterator<number>(this.data.map(e => e[0]));
    }
}