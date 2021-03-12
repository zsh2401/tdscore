import Vector2 from "../linear-algebra/Vector2";
import Transformation from "../linear-algebra/Transformation";

export default class LorzentzTransformationXT extends Transformation {
    constructor(x: number, t: number, c: number = 1) {
        super(...LorzentzTransformationXT.getVector(x, t, c));
    }
    private static getVector(x: number, t: number, c: number): [Vector2, Vector2] {
        const v = (x / t)
        const r = 1 / ((1 - (v ** 2 / c ** 2)) ** 0.5);
        const u = v / c;
        return [new Vector2(r, -r * u), new Vector2(-r * u, r)]
    }
}