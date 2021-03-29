/*
 * binSearch.ts
 * Created on Mon Mar 29 2021 08:52:43
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

import dsHashCode from "../../dsHashCode";

/**
 * 
 * 折半查找
 * Binary Search
 * 基本思想：也称为是折半查找，属于有序查找算法。
 * 用给定值k先与中间结点的关键字比较，中间结点把线形表分成两个子表，
 * 若相等则查找成功；若不相等，再根据k与该中间结点关键字的比较结果确定下一步查找哪个子表，
 * 这样递归进行，直到查找到或查找结束发现表中没有这样的结点。
 *
 * 复杂度分析： 最坏情况下，关键词比较次数为log 2 (n+1)，且 期望时间复杂度为O(log 2 n) ；
 *
 * 注： 折半查找的前提条件是需要有序表顺序存储，对于静态查找表，
 * 一次排序后不再变化，折半查找能得到不错的效率。
 * 但对于需要 频繁执行插入或删除操作的数据集来说，
 * 维护有序的排序会带来不小的工作量，那就不建议使用。——《大话数据结构》
 * 
 * @Stability Stable
 * @TimeComplexity O(log2n)
 * @SpaceComplexity O(1)
 * 
 * @param a The target to be searched. Must be sorted with hashCode
 * @key the key for searching
 */
export default function <E>(a: ArrayLike<E>, hashCode: number): number {
    let low = 0, high = a.length - 1, mid;
    while (low !== high) {
        mid = Math.floor((low + high) / 2)
        if (dsHashCode(a[mid]) === hashCode) {
            return mid
        } else if (dsHashCode(a[mid]) > hashCode) {
            high = mid - 1
        } else if (dsHashCode(a[mid]) < hashCode) {
            low = mid + 1
        }
    }
    return -1
}