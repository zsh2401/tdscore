/*
 * hashcode.ts
 * Created on Wed Mar 10 2021 19:10:07
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
 * Mulan Permissive Software License，Version 2
 */

import { isString, isNumber, isHashCodeGettable, isBoolean } from "./typechecker"
import {
    getHashCodeAny, getHashCodeBoolean, getHashCode4HashCodeGettable,
    getHashCodeNumber, getHashCodeString, getHashCodeNullOrUndefined
} from "./hashcode.impl"
export default function (v: any): number {
    if (v == null || v == undefined) {
        return getHashCodeNullOrUndefined(v);
    }
    else if (isString(v)) {
        return getHashCodeString(v);
    } else if (isNumber(v)) {
        return getHashCodeNumber(v);
    } else if (isBoolean(v)) {
        return getHashCodeBoolean(v);
    } else if (isHashCodeGettable(v)) {
        return getHashCode4HashCodeGettable(v);
    }
    else {
        return getHashCodeAny(v);
    }
}