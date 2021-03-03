import { Martix } from ".";
import { getIterator as _getIterator, IReadonlyList, toDSArray, toList } from "../../data-structure";
import Vector from "./Vector";

export default class Transformation
    extends Martix {

    readonly baseVectors: IReadonlyList<Vector>;

    constructor(...baseVectors: Vector[]) {
        super(Transformation.to2DMartix(baseVectors));
        this.baseVectors = toList(toDSArray(baseVectors));
    }

    private static to2DMartix(baseVectors: Vector[]) {
        const m: number[][] = [];

        for (let i = 0; i < baseVectors.length; i++) {
            m[i] = baseVectors.map(v => v.at(i, 0));
        };

        return m;
    }
}