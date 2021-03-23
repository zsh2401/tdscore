/*
 * cos.ts
 * Created on Tue Mar 16 2021 22:15:08
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

import DSNumber from "../../DSNumber";
import MixedNumber from "../../MixedNumber";
import DSFun from "../DSFun";
import factorial from "./factorial"
const TIMES = 15;
const f: DSFun = (x: MixedNumber): DSNumber => {
    x = DSNumber.valueOf(x)
    let result: DSNumber = DSNumber.ZERO;
    for (let i = 0; i < TIMES; i++) {
        result = result.plus(term(x, i));
    }
    return result;
}
function term(x: DSNumber, n: number): DSNumber {
    const sign = (-1) ** n;
    const s = (2 * n);

    const numerator = x.pow(s);
    const denominator = factorial(s);

    return (numerator.dividedBy(denominator)).mul(sign);
}
f.fname = "cosine"
f.range = [0, Number.POSITIVE_INFINITY]
export default f;