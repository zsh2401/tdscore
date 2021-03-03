import Martix from "./Martix";
import Transformation3 from "./Transformation3";
import Vector from "./Vector";

export default class Vector3
    extends Vector {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y, z);
        this.x = x;
        this.y = y;
        this.z = z;
    }
    transform(t: Transformation3): Vector3 {
        const m = t.mul(this);
        return new Vector3(m.at(0, 0), m.at(1, 0), m.at(2, 0));
    }
}