/*
 * martixAdd.ts
 * Created on Tue Mar 23 2021 09:21:45
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

import RawMartix from "./MartixTypes";
import martixSizeOf from "./sizeof";
import IElementOperator from "./IElementOperator";

export default function martixAdd<E>(a: RawMartix<E>, b: RawMartix<E>,
    eleOperator: IElementOperator<E>): RawMartix<E> {
    const [am, an] = martixSizeOf(a);
    const [bn, bp] = martixSizeOf(b);
    if (!(am == bn && an == bp)) {
        throw new Error();
    }
    const result: RawMartix<E> = [];
    for (let i = 0; i < am; i++) {
        result[i] = [];
        for (let j = 0; j < an; j++) {
            result[i][j] = eleOperator.add(a[i][j], b[i][j]);
        }
    }
    return result;
}
