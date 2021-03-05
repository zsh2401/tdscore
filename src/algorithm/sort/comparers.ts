/*
 * comparers.ts
 * Created on Fri Mar 05 2021 11:03:47
 *
 * Description: 
 *   This moudle provides user with most useful comparers.
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
 * Mulan Permissive Software License，Version 2
 */

import { asdn, MixedNumber } from "../../DSNumber";
import { ComparerResult } from "./IInternalSortAlgorithm"

export function ascdeningComparer(a: MixedNumber, b: MixedNumber): ComparerResult {
    const _a = asdn(a);
    const _b = asdn(b);
    if (_b.greaterThan(_a)) {
        return "rightGreaterThanLeft"
    } else if (_a.greaterThan(b)) {
        return "leftGreaterThanRight"
    } else {
        return "equal";
    }
}

export function descdeningComparer(a: MixedNumber, b: MixedNumber): ComparerResult {
    const _a = asdn(a);
    const _b = asdn(b);
    if (_b.greaterThan(_a)) {
        return "leftGreaterThanRight"
    } else if (_a.greaterThan(b)) {
        return "rightGreaterThanLeft"
    } else {
        return "equal";
    }
}