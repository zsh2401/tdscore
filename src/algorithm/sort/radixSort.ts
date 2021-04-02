/*
 * radixSort.ts
 * Created on Wed Mar 03 2021 22:32:52
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

import ArrayList from "../../data-structure/linear/ArrayList";
import IList from "../../data-structure/linear/IList"
import IQueue from "../../data-structure/linear/IQueue"
import UngrowableArrayList from "../../data-structure/linear/UngrowableArrayList"
import IArrayLike from "../../IArrayLike";
import IComparer from "../IComparer";

type RadixSortElement<E> = number | RadixSortElementWithData<E>;
export interface RadixSortElementWithData<E> {
    number: number;
    data: E;
}

/**
* 
* Radix Sort
* 
* @Stability Stable
* @WorstTimeComplexity O(d( n + r))
* @TimeComplexity O(d( n + r))
* @SpaceComplexity O(rd)
* 
* @param a The target array which is being sorted.
* @param comparer ignored
*/
export default function <E>
    (a: IArrayLike<RadixSortElement<E>>, comparer: IComparer<number>): void {

    const buckets: IList<IQueue<RadixSortElement<E>>> = new UngrowableArrayList(10);
    for (let i = 0; i < 10; i++) {
        buckets.listAdd(new ArrayList<RadixSortElement<E>>());
    }

    let maxBit = 1
    for (let i = 0; i < maxBit; i++) {
        for (let j = 0; j < a.length; j++) {
            const element = a[j]
            const num = typeof element === "number" ? element : element.number;
            const str = num.toFixed(0);

            //Update max bit
            const bitCount = Math.floor(Math.log10(num)) + 1;
            if (i === 0 && (bitCount > maxBit)) {
                maxBit = bitCount;
            }

            let radix: number = Number.parseInt(str.charAt(str.length - i - 1));
            if (Number.isNaN(radix)) {
                radix = 0;
            }
            buckets.listGet(radix).queueEn(element);
        }


        let j = 0;
        buckets.forEach(bucket => {
            // console.log(`${bucket.toJSArray()}`);
            while (!bucket.isEmpty()) {
                a[j++] = bucket.queueDe();
            }
        })
    }

}