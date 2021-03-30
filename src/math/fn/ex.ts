
/*
 * ex.ts
 * Created on Mon Mar 22 2021 20:20:08
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
import factorial from "./factorial"
import DSNumber from "../../DSNumber"
import { asDSNumber } from "../../DSNumber"
import createMFunction from "./createMFunction"
import pow from "./pow"

const f = createMFunction(
    (x: number) => {
        let result = 0
        for (let n = 0; n < 10; n++) {
            result += (pow(x, n) / factorial(n))
        }
        return result
    },
    (x: DSNumber) => {
        let result = DSNumber.ZERO
        for (let n = 0; n < 10; n++) {
            result = result.plus(pow(x, asDSNumber(n)).dividedBy(factorial(n)))
        }
        return result
    }
)
export default function <N extends (number | DSNumber)>(x: N): N {
    return f(x)
}