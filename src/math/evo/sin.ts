import { PI } from "..";
import DSNumber from "../../DSNumber"
import factorial from "./factorial";
const ONE = DSNumber.valueOf(1);
const TWO = DSNumber.valueOf(2);
const ZERO = DSNumber.valueOf(0);
const N_ONE = DSNumber.valueOf(-1);
const LATEST_TERMS = DSNumber.valueOf(15);

export default function (x: DSNumber): DSNumber {
    let result = ZERO;

    const terms = LATEST_TERMS.plus(x.dividedBy(2).abs());

    for (let i = ZERO; i.lessThan(terms); i = i.plus(ONE)) {
        result = result.plus(term(x, i))
    }
    return result;
}
function term(x: DSNumber, n: DSNumber) {
    const sign = N_ONE.pow(n)
    const s = TWO.mul(n).plus(DSNumber.ONE);

    const numerator = x.pow(s);
    const denominator = factorial(s);

    return sign.mul(numerator.dividedBy(denominator))
}