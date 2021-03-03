import { DSNumber } from "../..";

export default function factorial(x: DSNumber): DSNumber {
    if (!x.isPosivite()) {
        throw new RangeError("negative number is meaningless.");
    }
    if (x.equals(DSNumber.ZERO) ||
        x.equals(DSNumber.ONE)) {
        return DSNumber.ONE;
    }
    return x.mul(factorial(x.sub(DSNumber.valueOf(1))));
}