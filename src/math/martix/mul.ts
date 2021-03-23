/*
 * martixMul.ts
 * Created on Tue Mar 23 2021 09:21:52
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

import RawMartix from "./RawMartix";
import martixSizeOf from "./sizeof";
import IElementOperator from "./IElementOperator";

export default function martixMul<E>(a: RawMartix<E>, b: RawMartix<E>,
    eleOperator: IElementOperator<E>): RawMartix<E> {
    const [am, an] = martixSizeOf(a);
    const [bn, bp] = martixSizeOf(b);
    if (an !== bn) {
        throw new Error();
    }
    const result: RawMartix<E> = [];
    for (let i = 0; i < am; i++) {
        result[i] = [];
        for (let j = 0; j < bp; j++) {
            let rij: E = eleOperator.defaultValue;
            for (let n = 0; n < an; n++) {
                const term = eleOperator.mul(a[i][n], b[n][j]);
                rij = rij === null ? term : eleOperator.add(rij, term);
            }
            result[i][j] = rij;
        }
    }
    return result;
}
