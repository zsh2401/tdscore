/*
 * IInternalSortAlgorithm.ts
 * Created on Wed Mar 03 2021 22:32:35
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

export default interface ISortAlgorithm<E> {
    (target: IArrayLike<E>, comparer: IComparer<E>): void;
}
export interface IComparer<E> {
    /**
     * Compare the a and b
     * @returns nagative number if a less than b, zero if a equals b, positive number if a greater than b.
     */
    (a: E, b: E): number;
}