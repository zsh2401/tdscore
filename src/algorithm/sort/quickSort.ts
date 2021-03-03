/**
 * 快速排序
 */

import { qucikSort } from ".";
import { f } from "../../data-structure/tree/buildCompletedTree";
import MixedArray from "../../MixedArray";
import ISortAlgorithm, { IComparer } from "./IInternalSortAlgorithm";

/**
 * Quick Sort
 * @Stability Unstable
 * @TimeComplexity O(nlog(n))
 * @SpaceComplexity O(1)
 * 
 * @param a 
 * @param comparer 
 */
export default function <E>(array: MixedArray<E>, comparer: IComparer<E>) {
    quickSortInner(array, comparer, 0, array.length - 1);
}
function quickSortInner<E>(array: MixedArray<E>, comparer: IComparer<E>,
    low: number, high: number) {

    if (low >= high) return;

    let iLow = low;
    let iHigh = high;
    const iPivot = iHigh;

    let s = (array as E[]);
    let toRight = true;
    while (iLow < iHigh) {

        if (comparer(s[iLow], s[iHigh])) {
            const tmp = s[iLow];
            s[iLow] = s[iHigh];
            s[iHigh] = tmp;
            toRight != toRight;
        }

        if (toRight) {
            iLow++
        } else {
            iHigh--;
        }
    }
    const tmp = s[iPivot];
    s[iPivot] = s[iHigh];
    s[iHigh] = tmp;

    quickSortInner(s, comparer, low, iLow - 1);
    quickSortInner(s, comparer, iLow + 1, high);
}