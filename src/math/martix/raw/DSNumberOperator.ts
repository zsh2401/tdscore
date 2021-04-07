/*
 * NumberOperator.ts
 * Created on Tue Mar 23 2021 09:21:27
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

import DSNumber from "../../../DSNumber";
import MixedNumber from "../../../MixedNumber";
import IElementOperator from "./IElementOperator";

const NumberOperator: IElementOperator<MixedNumber> = {
    add: (a: MixedNumber, b: MixedNumber): MixedNumber => {
        return DSNumber.valueOf(a).plus(b);
    },
    sub: (a: MixedNumber, b: MixedNumber): MixedNumber => {
        return DSNumber.valueOf(a).sub(b);
    },
    mul: (a: MixedNumber, b: MixedNumber): MixedNumber => {
        return DSNumber.valueOf(a).mul(b);
    },
    divBy: (a: MixedNumber, b: MixedNumber): MixedNumber => {
        return DSNumber.valueOf(a).dividedBy(b);
    },
    nagated: (x: MixedNumber): MixedNumber => {
        return x.toDSNumber().negated();
    },
    defaultValue: 0
};
export default NumberOperator;