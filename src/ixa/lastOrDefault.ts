/*
 * lastOrDefault.ts
 * Created on Thu Apr 15 2021 14:14:42
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

import UIterable from "../data-structure/UIterable";
import last from "./last";

/**
 * 获取最后一个元素，如果获取失败
 * 则返回传入的默认值
 * @param iterable 
 * @param defaultValue 
 * @returns 
 */
export default function <E>(iterable: UIterable<E>, defaultValue: E): E {
    try {
        return last(iterable)
    } catch {
        return defaultValue
    }
}