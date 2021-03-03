import DSObject from "../DSObject"
import hashCode from "../util/hash";

//TODO wait to be tested.
export default class Color extends DSObject {
    private readonly rgba: number;
    constructor(r: number, g: number, b: number, a: number) {
        super();
        let tmp = 0;
        tmp |= Color.makeValid(r) << 24;
        tmp |= Color.makeValid(g) << 16;
        tmp |= Color.makeValid(b) << 8;
        tmp |= Color.makeValid(a);
        this.rgba = tmp;
    }
    private static makeValid(x: number): number {
        x <<= 24;
        x >>= 24;
        return x;
    }
    getHashCode() {
        return hashCode("Color:" + this.rgba);
    }
}