/*
 * shellSort.ts
 * Created on Wed Mar 03 2021 22:32:56
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
* Shell Sort
* 
* Shellsort, also known as Shell sort or Shell's method, 
* is an in-place comparison sort. It can be seen as either a generalization of 
* sorting by exchange (bubble sort) or sorting by insertion (insertion sort).
* The method starts by sorting pairs of elements far apart from each 
* other, then progressively reducing the gap between elements to be compared. 
* By starting with far apart elements, it can move some out-of-place elements 
* into position faster than a simple nearest neighbor exchange. Donald Shell 
* published the first version of this sort in 1959. The running time of 
* Shellsort is heavily dependent on the gap sequence it uses. For many practical 
* variants, determining their time complexity remains an open problem.
* 
* @SortType Insertion Sort
* @Stability Unstable
* @TimeComplexity O(n ^ 1.5)
* @SpaceComplexity O(1)
* 
* @param a The target array which is being sorted.
* @param comparer The comparer used to compare elements.
*/
export default function <E>
    (a: IArrayLike<E>, comparer: IComparer<E>) {

    const s = (a as E[]);
    for (let delta = 5; delta > 0; delta = Math.floor(delta / 2)) {
        for (let i = delta; i < a.length; i++) {
            const tmp = s[i];
            let j: number;
            for (j = i; j >= delta && comparer(s[j - delta], tmp) === "leftGreaterThanRight"; j -= delta) {
                s[j] = s[j - delta]
            }
            s[j] = tmp;
        }
    }

}
