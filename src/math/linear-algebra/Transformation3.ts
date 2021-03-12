import Vector3 from "./Vector3";
import Transformation from "./Transformation";

export default class Transformation3 extends Transformation {
    constructor(i: Vector3, j: Vector3, h: Vector3) {
        super(i, j, h);
    }
}