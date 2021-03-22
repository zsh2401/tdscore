/*
 * factorial.ts
 * Created on Tue Mar 16 2021 21:59:09
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

const f: DSFun = (x: MixedNumber): DSNumber => {
    x = DSNumber.valueOf(x);
    if (x.lessThan(0)) {
        throw new RangeError("negative number is meaningless.");
    }
    if (x.equals(0) || x.equals(1)) {
        return DSNumber.valueOf(1)
    }
    return x.mul(f(x.sub(1)));
}
export default f;