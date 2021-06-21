import DSObject from "../DSObject"
import Ref from "../Ref";
import hashCode from "../util/hashing";

//TODO wait to be tested.
export default class Color extends DSObject {

    private readonly rgba: Ref<number>

    constructor(r: number, g: number, b: number, a: number) {
        super()
        this.rgba = new Ref<number>(0)
        red(this.rgba, r)
        green(this.rgba, g)
        blue(this.rgba, b)
        alpha(this.rgba, a)
    }

    get red(): number {
        return red(this.rgba)
    }

    get green(): number {
        return green(this.rgba)
    }

    get blue(): number {
        return blue(this.rgba)
    }

    get alpha(): number {
        return alpha(this.rgba)
    }

    getHashCode() {
        return 0x11031 ^ hashCode(this.rgba.value);
    }
}

export function uni(color: Ref<number>, bit: number, newValue?: number): number {
    if (newValue !== undefined) {
        const replacer = (- 0xff_ff_ff_ff) >>> (32 - bit)
        color.value &= replacer
        color.value &= (newValue << bit)
        return newValue;
    } else {
        const mask = 0xff << bit;
        return (color.value & mask) >>> bit
    }
}
export function red(color: Ref<number>, newValue?: number): number {
    return uni(color, 24, newValue)
}
export function green(color: Ref<number>, newValue?: number): number {
    return uni(color, 16, newValue)
}
export function blue(color: Ref<number>, newValue?: number): number {
    return uni(color, 8, newValue)
}
export function alpha(color: Ref<number>, newValue?: number): number {
    return uni(color, 0, newValue)
}