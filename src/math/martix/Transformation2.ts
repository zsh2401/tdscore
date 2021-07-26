import Transformation from "./Transformation";
import Vector from "./Vector";

export default class Transformation2 extends Transformation {
    constructor(ix: number, iy: number, jx: number, jy: number) {
        super(new Vector(ix, iy), new Vector(jx, jy));
    }
}