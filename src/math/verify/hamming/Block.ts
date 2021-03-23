/*
 * Block.ts
 * Created on Tue Mar 23 2021 11:05:57
 *
 * Description: 
 *   Hamming Code 
 *   see https://zh.wikipedia.org/wiki/%E6%B1%89%E6%98%8E%E7%A0%81
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

import BitSpan from "../../../data-structure/linear/BitSpan";

function lb(x: number): number {
    const b = Math.log(2);
    return Math.log(x) / b;
}
export type VerifyType = "ok" | "fixed" | "error"

//TODO
export function verifyData(data: BitSpan): VerifyType {
    throw new Error("This method has not been implemented.");
    return "ok"
}
export default function getHammingCode(data: BitSpan): BitSpan {
    const countOfControlBit = Math.ceil(lb(data.length));
    const len = data.length + countOfControlBit + 2;
    const buffer = new Array(len).fill(false)
    const result = new BitSpan(buffer);

    //第一步： 填充数据
    let j = 0;
    let c = 0;
    for (let i = 3; i < result.length; i++) {
        // const p = i + 1;
        if ((i & i - 1) !== 0) {
            if (data.at(j)) {
                result.at(i, true)
                c ^= i
            }
            j++
        }
    }
    const str = Number(c).toString(2)

    //填充控制位
    for (let i = 0; i <= countOfControlBit; i++) {
        const p = 2 ** i;
        console.log(str.charAt(str.length - i - 1))
        result.at(p, str.charAt(str.length - i - 1) === "0" ? false : true);
    }

    //填充奇偶校验位
    let fBit = false;
    for (let i = 0; i < result.length; i++) {
        fBit = fBit !== result.at(i)
    }
    result.at(0, fBit)
    return result;
}