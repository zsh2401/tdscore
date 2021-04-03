/*
 * simpleSelectionSort.ts
 * Created on Wed Mar 03 2021 22:33:05
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
import comparers from "../comparers";
import IComparer  from "../IComparer";

/**
* 
* Simple Selection Sort
* 
* @SortType Selection Sort
* @Stability Stable
* @TimeComplexity O(n ^ 2)
* @SpaceComplexity O(1)
* @BestTimeComplexity O(n ^ 2)
* @WorstTimeComplexity O(n ^ 2)
* 
* @param a The target array which is being sorted.
* @param comparer The comparer used to compare elements.
*/
export default function <E>
    (array: IArrayLike<E>, comparer: IComparer<E>=comparers.hash) {
    for (let i = 0; i < array.length; i++) {
        const min = findMin(array, comparer, i, array.length - 1);
        const tmp = array[min];
        array[min] = array[i];
        array[i] = tmp;
    }
}

function findMin<E>(e: IArrayLike<E>, comparer: IComparer<E>, start: number = 0, end?: number): number {
    if (e.length < 0) {
        throw new Error("Empty array");
    }
    let min: number = start;
    end ??= e.length;

    for (let i = start; i <= end; i++) {
        if (comparer(e[i], e[min]) < 0) {
            min = i;
        }
    }
    return min;
}