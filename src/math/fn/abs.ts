/*
 * abs.ts
 * Created on Tue Mar 23 2021 09:10:22
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
    (x: number) => {
        return x < 0 ? -x : x;
    },
    (x: DSNumber) => {
        return x.abs()
    }
)
export default function abs<N extends MixedNumber>(x: N): N {
    return f<N>(x)
}