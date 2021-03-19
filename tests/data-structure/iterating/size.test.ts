/*
 * size.test.ts
 * Created on Fri Mar 19 2021 18:36:50
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

import "ts-jest"
import { HashMap, HashSet, size } from "../../../src"
it("to be zero", () => {
    expect(size(new HashMap())).toBe(0)
})

it("to be i", () => {
    const len = Math.floor(Math.random() * 1000) + 999;
    const set = new HashSet();
    for (let i = 0; i < len; i++) {
        set.add(i);
    }
    expect(size(set)).toBe(len)
})