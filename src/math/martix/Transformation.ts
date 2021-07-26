import Martix  from "./Martix";
import _getIterator from "../../ixa/getIterator"
import toList from "../../ixa/toList"
import IReadonlyList from "../../data-structure/linear/IReadonlyList"
import Vector from "./Vector";
import DSArray  from "../../DSArray";

export default class Transformation
    extends Martix {

    readonly baseVectors: IReadonlyList<Vector>;

    constructor(...baseVectors: Vector[]) {
        super(Transformation.to2DMartix(baseVectors));
        this.baseVectors = toList(DSArray.from(baseVectors));
    }

    private static to2DMartix(baseVectors: Vector[]) {
        const m: number[][] = [];

        for (let i = 0; i < baseVectors.length; i++) {
            m[i] = baseVectors.map(v => v.at(i, 0));
        };

        return m;
    }
}