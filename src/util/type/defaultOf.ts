/*
 * defaultOf.ts
 * Created on Wed Mar 10 2021 19:09:59
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

const DEFAULT_SYMBOL = Symbol("0");
export default function defaultOf<E>(type: string): E {
    switch (type) {
        case "bigint":
        case "number":
            //@ts-expect-error
            return 0;
        case "boolean":
            //@ts-expect-error
            return false;
        case "symbol":
            //@ts-expect-error
            return DEFAULT_SYMBOL;
        case "function":
        case "object":
        case "string":
        case "undefined":
        default:
            //@ts-expect-error
            return null;
    }
}