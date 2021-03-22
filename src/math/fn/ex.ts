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
import DSNumber, { MixedNumber } from "../../DSNumber";
import DSFun from "../DSFun";
import factorial from "./factorial";
import pow from "./pow";
const f: DSFun = (x: MixedNumber): DSNumber => {
    let result = DSNumber.ZERO;
    for (let n = 0; n < 10; n++) {
        result = result.plus(pow(x, n).dividedBy(factorial(n)))
    }
    return result;
}
export default f;