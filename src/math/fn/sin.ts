/*
 * sin.ts
 * Created on Tue Mar 16 2021 21:59:00
 *
 * Description: 
 *   No description.
 *
 * Copyright (c) 2021 tdscore
 * 
 * Copyright (c) 2021 Seymour Zhang and all contributors of this project.
 * tdscore is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import MixedNumber from "../../MixedNumber";
import DSNumber from "../../DSNumber"
import factorial from "./factorial";
import pow from "./pow";
import createMultiType from "./createMultiType";
const ONE = DSNumber.valueOf(1);
const TWO = DSNumber.valueOf(2);
const ZERO = DSNumber.valueOf(0);
const N_ONE = DSNumber.valueOf(-1);
const LATEST_TERMS = DSNumber.valueOf(15);


const f = createMultiType(
    (x: number) => {
        let result = 0
        const terms = 15 + Math.abs(x / 2)
        for (let i = 0; i < terms; i++) {
            result += term(x, i)
        }
        return result;
    },
    (x: DSNumber) => {
        let result = ZERO;

        const terms = LATEST_TERMS.plus(x.dividedBy(2).abs());

        for (let i = ZERO; i.lessThan(terms); i = i.plus(ONE)) {
            result = result.plus(termDSNumber(x, i))
        }
        return result;
    }
)
export default function <N extends MixedNumber>(x: N): N {
    return f(x)
}
export function term(x: number, n: number): number {
    const sign: number = pow(-1, n)
    const s = 2 * n + 1

    const numerator = pow(x, s)
    const denominator = factorial(s);

    return sign * (numerator / denominator)
}
function termDSNumber(x: DSNumber, n: DSNumber): DSNumber {
    const sign = N_ONE.pow(n)
    const s = TWO.mul(n).plus(DSNumber.ONE);

    const numerator = x.pow(s);
    const denominator = factorial(s);

    return sign.mul(numerator.dividedBy(denominator))
}