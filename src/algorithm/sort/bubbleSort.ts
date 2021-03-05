/*
 * bubbleSort.ts
 * Created on Wed Mar 03 2021 22:32:20
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
/*
bubbleSort.ts (c) 2021

Author: Seymour Zhang and other contributors.
Description: description

Created:  2021-03-03T14:18:44.648Z

Copyright (c) 2021 Seymour Zhang and other contributors.
tdscore is licensed under Mulan PSL v2.
You can use this software according to the terms and conditions of the Mulan PSL v2.
You may obtain a copy of Mulan PSL v2 at:
      http://license.coscl.org.cn/MulanPSL2
THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
See the Mulan PSL v2 for more details.
Mulan Permissive Software License，Version 2

*/

/**
 * 冒泡排序
 */
import IArrayLike from "../../IArrayLike";
import { IComparer } from "./IInternalSortAlgorithm";

/**
 * 
 * Bubble Sort
 * 
 * @Stability Stable
 * @BestTimeComplexity O(n)
 * @WorstTimeComplexity O(n ^ 2)
 * @TimeComplexity O(n^2)
 * @SpaceComplexity O(1)
 * 
 * @param a The target array which is being sorted.
 * @param comparer The comparer used to compare elements.
 */
export default function bubbleSort<E>
    (a: IArrayLike<E>, comparer: IComparer<E>) {

    let exchangedLastTime = true;
    for (let i = 0; (i < a.length - 1 && exchangedLastTime); i++) {
        exchangedLastTime = false;
        for (let j = 0; j < a.length - i - 1; j++) {
            if (comparer(a[j], a[j + 1]) === "leftGreaterThanRight") {
                const tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
                exchangedLastTime = true;
            }
        }
    }
}