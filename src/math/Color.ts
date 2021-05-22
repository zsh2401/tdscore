import DSObject from "../DSObject"
import hashCode from "../util/hashing";

//TODO wait to be tested.
export default class Color extends DSObject {
    private readonly rgba: number;

    constructor(r: number, g: number, b: number, a: number) {

        super();
        let tmp = 0;
        tmp |= Color.to8Bit(r) << 24;
        tmp |= Color.to8Bit(g) << 16;
        tmp |= Color.to8Bit(b) << 8;
        tmp |= Color.to8Bit(a);
        this.rgba = tmp;
    }
    
    private static to8Bit(x: number): number {
        x <<= 24;
        x >>= 24;
        return x;
    }

    getHashCode() {
        return hashCode("Color:" + this.rgba);
    }
}