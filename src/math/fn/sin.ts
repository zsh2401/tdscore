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

import { MixedNumber } from "../../DSNumber";
import DSFun from "../DSFun";
import DSNumber from "../../DSNumber"
import factorial from "./factorial";
const ONE = DSNumber.valueOf(1);
const TWO = DSNumber.valueOf(2);
const ZERO = DSNumber.valueOf(0);
const N_ONE = DSNumber.valueOf(-1);
const LATEST_TERMS = DSNumber.valueOf(15);

const f: DSFun = (x: MixedNumber): DSNumber => {
    x = DSNumber.valueOf(x)
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
f.fname = "sine"
export default f;