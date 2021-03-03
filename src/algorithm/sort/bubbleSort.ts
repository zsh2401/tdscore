/**
 * 冒泡排序
 */
import DSArray from "../../DSArray";
import { Func2 } from "../../Func";
import MixedArray from "../../MixedArray";
import { IComparer } from "./IInternalSortAlgorithm";

/**
 * Bubble Sort
 * @Stability Stable
 * @TimeComplexity O(n^2)
 * @SpaceComplexity O(1)
 * 
 * @param a 
 * @param comparer 
 */
export default function bubbleSort<E>
    (a: MixedArray<E>, comparer: IComparer<E>) {

    let exchangedLastTime = true;
    for (let i = 0; (i < a.length - 1 && exchangedLastTime); i++) {
        exchangedLastTime = false;
        for (let j = 0; j < a.length - i - 1; j++) {
            if (comparer(a[j], a[j + 1])) {
                const tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
                exchangedLastTime = true;
            }
        }
    }
}