/*
 * asIterable.ts
 * Created on Sat Mar 27 2021 12:00:16
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

import IIterable from "../data-structure/IIterable";
import getIterator from "./getIterator";

/**
 * 将原生JS类数组转换为可迭代类型
 * @param jsa 
 * @returns 
 */
export default function asIterable<E>(jsa: ArrayLike<E>): IIterable<E> {
    return {
        getIterator: () => getIterator(jsa)
    }
}