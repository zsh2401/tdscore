/*
 * sequenceSearch.ts
 * Created on Mon Mar 29 2021 08:49:42
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
 */

import IArrayLike from "../../IArrayLike";
import IDirectionIndicator from "../IDirectionIndicator";

/**
 * 
 * 顺序查找
 * Sequence Search
 * 查找成功时的平均查找长度为：（假设每个数据元素的概率相等） 
 * ASL = 1/n(1+2+3+…+n) = (n+1)/2 ;
 * 当查找不成功时，需要n+1次比较，时间复杂度为O(n);
 * 所以， 顺序查找的时间复杂度为O(n) 。
 * 
 * @Stability Stable
 * @TimeComplexity O(n)
 * @SpaceComplexity O(1)
 * 
 * @param a The target to be searched
 * @key the key for searching
 */
export default function <E>(a: IArrayLike<E>, indicator: IDirectionIndicator<E>): number {
    for (let i = 0; i < a.length; i++) {
        if (indicator(a[i]) === 0) {
            return i
        }
    }
    return -1
}