/*
 * simpleInsertionSort.ts
 * Created on Wed Mar 03 2021 22:33:01
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

import IArrayLike from "../../IArrayLike";
import { IComparer } from "./IInternalSortAlgorithm";

/**
* 
* Simple Insertion Sort
* 
* @SortType Insertion Sort
* @Stability Stable
* @TimeComplexity O(n ^ 2)
* @SpaceComplexity O(1)
* @BestTimeComplexity O(n)
* @WorstTimeComplexity O(n ^ 2)
* 
* @param a The target array which is being sorted.
* @param comparer The comparer used to compare elements.
*/
export default function <E>
    (array: IArrayLike<E>, comparer: IComparer<E>) {

    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            if (comparer(array[j - 1], array[j]) === "leftGreaterThanRight") {
                const tmp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = tmp;
            }
        }
    }
}