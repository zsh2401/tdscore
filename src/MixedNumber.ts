import DSNumber from "./DSNumber";

/**
 * 混合的数字类型
 */
type MixedNumber = DSNumber | number;
export default MixedNumber;

export function asDSNumber(x: MixedNumber): DSNumber {
    if (x instanceof DSNumber) {
        return x
    } else {
        return DSNumber.valueOf(x)
    }
}
export function asJSNumber(x: MixedNumber): number {
    if (x instanceof DSNumber) {
        return x.toJSNumber()
    } else {
        return x
    }
}