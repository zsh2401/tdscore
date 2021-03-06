/*
 * RawMartix.test.ts
 * Created on Fri Mar 19 2021 20:08:35
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
import { martixMul, martixDet, NumberOperator } from "../../src/math/martix"
it("martix", () => {
    const r = martixMul([[1, 2], [1, -1]], [[1, 2, -3], [-1, 1, 2]], NumberOperator);
    // expect()
})

// it("det", () => {
//     expect(martixDet([
//         [0, 0, 3],
//         [0, 5, 0],
//         [8, 0, 0]
//     ], NumberOperator)).toBe(0);
// })