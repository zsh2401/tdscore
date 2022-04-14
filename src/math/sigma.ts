/*
 * sigma.ts
 * Created on Wed Apr 13 2022 15:12:02
 *
 * Description: 
 *   No description.
 *
 * Copyright (c) 2022 tdscore
 * 
 * Copyright (c) 2022 Seymour Zhang and all contributors of this project.
 * tdscore is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

/**
 * ∑ function
 * @param term 
 * @param from 
 * @param to 
 * @returns 
 */
export default function (term: (i: number) => number, from: number, to: number) {
    let result = 0;
    for (let i = from; i < to; i++) {
        result += term(i);
    }
    return result;
}