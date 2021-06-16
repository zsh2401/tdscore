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

import LinkedList from "../../data-structure/linear/LinkedList";
import IStack from "../../data-structure/linear/IStack"
import IArrayLike from "../../IArrayLike";
import IComparer from "../../IComparer";
import comparers from "../comparers";

export default function <E>(array: IArrayLike<E>,
    comparer: IComparer<E> = comparers.hash): void {
    const suspendedTasks: IStack<() => void> = new LinkedList();
    suspendedTasks.stackPush(() => quickSortInner(array, comparer, 0, array.length - 1, suspendedTasks))
    while (!suspendedTasks.isEmpty()) {
        suspendedTasks.stackPop()()
    }
}

function quickSortInner<E>(array: IArrayLike<E>, comparer: IComparer<E>,
    low: number, high: number,
    tasks: IStack<() => void>) {

    if (low >= high) return;

    let iLow = low;
    let iHigh = high;
    const iPivot = iHigh;

    let toRight = true;
    while (iLow < iHigh) {

        if (comparer(array[iLow], array[iHigh]) > 0) {
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

    tasks.stackPush(() => quickSortInner(array, comparer, low, iLow - 1, tasks))
    tasks.stackPush(() => quickSortInner(array, comparer, iLow + 1, high, tasks))

}