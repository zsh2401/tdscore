/**
 * 冒泡排序
 */
import DSArray from "../../DSArray";
import { Func2 } from "../../Func";
import MixedArray from "../../MixedArray";
type Comparer<E> = Func2<E, E, boolean>;
export default function bubbleSort<E>
    (a: MixedArray<E>, comparer: Comparer<E>) {
    //TODO 
    throw new Error("Not implemented");
    // let modifiedFlag = true;
    // for (let time = 1; time < a.length - 1; time++) {
    //     if (!modifiedFlag) {
    //         break;
    //     }
    //     for(let i = 0;i<)
    //     modifiedFlag = false;
    //     const r = comparer(a[i - 1], a[i]);
    //     if (r) {
    //         //exchange element
    //         const tmp = a[i - 1];
    //         a[i - 1] = a[i];
    //         a[i] = tmp;
    //         modifiedFlag = true;
    //     }
    // }
}