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

import IHashCodeGettable from "./IHashCodeGettable"
import {
    getHashCodeBoolean,
    getHashCodeNumber, getHashCodeString, getHashCodeNullOrUndefined
} from "./hashCodeForPrimitiveType"
import hashCodeForAny from "./hashCodeForAny";

export default function (v: any): number {
    if (v == null || v == undefined) {
        return getHashCodeNullOrUndefined(v);
    }
    switch (typeof v) {
        case "string":
            return getHashCodeString(v);
        case "number":
            return getHashCodeNumber(v);
        case "boolean":
            return getHashCodeBoolean(v);
        default:
            if (isHashCodeGettable(v)) {
                return v.getHashCode();
            } else {
                return hashCodeForAny(v);
            }
    }
}
function isHashCodeGettable(e: any): e is IHashCodeGettable {
    return typeof (<IHashCodeGettable>e).getHashCode === "function";
}