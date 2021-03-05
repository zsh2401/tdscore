/*
 * quickSort.ts
 * Created on Wed Mar 03 2021 22:32:48
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
/**
 * 快速排序
 */

import IArrayLike from "../../IArrayLike";
import { IComparer } from "./IInternalSortAlgorithm";

 /**
 * 
 * Quick Sort
 * 
 * @SortType Exchange Sort
 * @Stability Unstable
 * @BestTimeComplexity O(n log2 n)
 * @WorstTimeComplexity O(n ^ 2)
 * @TimeComplexity O(n log2 n)
 * @SpaceComplexity O(1)
 * 
 * @param a The target array which is being sorted.
 * @param comparer The comparer used to compare elements.
 */
export default function <E>(array: IArrayLike<E>, comparer: IComparer<E>) {
    quickSortInner(array, comparer, 0, array.length - 1);
}
function quickSortInner<E>(array: IArrayLike<E>, comparer: IComparer<E>,
    low: number, high: number) {

    if (low >= high) return;

    let iLow = low;
    let iHigh = high;
    const iPivot = iHigh;

    let toRight = true;
    while (iLow < iHigh) {

        if (comparer(array[iLow], array[iHigh]) === "leftGreaterThanRight") {
            const tmp = array[iLow];
            array[iLow] = array[iHigh];
            array[iHigh] = tmp;
            toRight != toRight;
        }

        if (toRight) {
            iLow++
        } else {
            iHigh--;
        }
    }
    const tmp = array[iPivot];
    array[iPivot] = array[iHigh];
    array[iHigh] = tmp;

    quickSortInner(array, comparer, low, iLow - 1);
    quickSortInner(array, comparer, iLow + 1, high);
}