/*
 * pow.ts
 * Created on Tue Mar 16 2021 21:59:04
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
import createMultiType from "./createMultiType";
const f = createMultiType(
    (x: number, n: number) => {
        return Math.pow(x, n)
    },
    (x: DSNumber, n: DSNumber) => {
        return x.pow(n)
    }
);
/**
 * 后期考虑使用牛顿迭代实现的幂函数
 * @param x 
 * @param n 
 * @returns 
 */
export default function <N extends MixedNumber>(x: N, n: N): N {
    return f(x, n)
}