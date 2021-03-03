import { Martix, Vector2 } from ".";
import Transformation from "./Transformation";

export default class Transformation2 extends Transformation {
    constructor(ix: number, iy: number, jx: number, jy: number) {
        super(new Vector2(ix, iy), new Vector2(jx, jy));
    }
}