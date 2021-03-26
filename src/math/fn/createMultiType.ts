/*
 * createMultiType.ts
 * Created on Fri Mar 26 2021 16:16:42
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

export interface JSNumberFunction {
    (...numbers: number[]): number
}
export interface DSNumberFunction {
    (...numbers: DSNumber[]): DSNumber
}
export interface Fun {
    <N extends MixedNumber>(...numbers: N[]): N
}
/**
 * Create a function can process DSNumber and number at same time.
 * @param forJS 
 * @param forDS 
 * @returns 
 */
export default function (forJS: JSNumberFunction,
    forDS: DSNumberFunction,): Fun {

    return <N extends MixedNumber>(...numbers: N[]): N => {
        switch (typeof numbers[0]) {
            case "number":
                return forJS(...(numbers as number[])) as N
            case "object":
                return forDS(...(numbers as DSNumber[])) as N
            default:
                throw new Error("Invalid element type.");
        }
    }
}