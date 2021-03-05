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

import { ArrayList, IList, IQueue, UngrowableArrayList } from "../../data-structure";
import MixedArray from "../../MixedArray";
import { IComparer } from "./IInternalSortAlgorithm";

type RadixSortElement<E> = number | RadixSortElementWithData<E>;
export interface RadixSortElementWithData<E> {
    number: number;
    data: E;
}
export default function <E>
    (a: MixedArray<RadixSortElement<E>>, comparer: IComparer<number>): void {

    const s = (a as RadixSortElement<E>[]);

    const buckets: IList<IQueue<RadixSortElement<E>>> = new UngrowableArrayList(9);
    for (let i = 0; i < 9; i++) {
        buckets.listAdd(new ArrayList<RadixSortElement<E>>());
    }

    let maxBit = 1
    for (let i = 0; i < maxBit; i++) {
        s.forEach((element) => {
            const num = typeof element === "number" ? element : element.number;
            const str = num.toFixed(0)
            const radix: number = Number.parseInt(str[str.length - i - 1]) ?? 0;
            console.log(`${element} ${radix} ${str.length - i}`);
            buckets.listGet(radix).queueEn(element);
        });
        let i = 0;
        buckets.forEach(bucket => {
            while (bucket.collectionSize() > 0) {
                a[i++] = bucket.queueDe();
            }
        })
    }

}