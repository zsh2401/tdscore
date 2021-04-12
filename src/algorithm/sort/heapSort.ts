/*
 * heapSort.ts
 * Created on Wed Mar 03 2021 22:32:23
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
import comparers from "../comparers";
import IComparer from "../../IComparer";

/**
 * 
 * Heap Sort
 * 
 * In computer science, heapsort is a comparison-based sorting algorithm. 
 * Heapsort can be thought of as an improved selection sort: like selection sort, 
 * heapsort divides its input into a sorted and an unsorted region, and it 
 * iteratively shrinks the unsorted region by extracting the largest element 
 * from it and inserting it into the sorted region. Unlike selection sort, 
 * heapsort does not waste time with a linear-time scan of the unsorted region; 
 * rather, heap sort maintains the unsorted region in a heap data structure 
 * to more quickly find the largest element in each step.
 *
 * Although somewhat slower in practice on most machines than a well-implemented quicksort, 
 * it has the advantage of a more favorable worst-case O(n log n) runtime. 
 * Heapsort is an in-place algorithm, but it is not a stable sort.
 *
 * Heapsort was invented by J. W. J. Williams in 1964. This was 
 * also the birth of the heap, presented already by Williams as a 
 * useful data structure in its own right. In the same year, 
 * R. W. Floyd published an improved version that could sort an array in-place, 
 * continuing his earlier research into the treesort algorithm.
 * 
 * @ChineseArticle https://www.cnblogs.com/jetpie/p/3971382.html
 * @Wiki https://en.wikipedia.org/wiki/Heapsort
 * @Stability Stable
 * @BestTimeComplexity O(n log n) (distinct keys)  or O(n) (equal keys)
 * @WorstTimeComplexity O(n log n)
 * @TimeComplexity O(n * log n)
 * @SpaceComplexity O(1)
 * 
 * @param a The target array which is being sorted.
 * @param comparer The comparer used to compare elements.
 */
export default function <E>
    (a: IArrayLike<E>, comparer: IComparer<E> = comparers.hash) {
    let len = a.length;

    buildMaxHeap(a, len, comparer);

    for (let i = a.length - 1; i > 0; i--) {
        swap(a, 0, i);
        len--;
        heapify(a, len, 0, comparer);
    }
    return a;
}
function buildMaxHeap<E>(a: IArrayLike<E>, len: number, comparer: IComparer<E>) {
    for (var i = Math.floor(len / 2); i >= 0; i--) {
        heapify(a, len, i, comparer);
    }
}
function heapify<E>(a: IArrayLike<E>, len: number, i: number, comparer: IComparer<E>) {
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < len && comparer(a[left], a[largest]) > 0) {
        largest = left;
    }

    if (right < len && comparer(a[right], a[largest]) > 0) {
        largest = right;
    }

    if (largest != i) {
        swap(a, i, largest);
        heapify(a, len, largest, comparer);
    }
}
function swap<E>(a: IArrayLike<E>, i: number, j: number) {
    const tmp = a[i];
    a[j] = a[i]
    a[i] = tmp;
}