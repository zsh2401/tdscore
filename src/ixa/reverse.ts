
/*
 * reverse.ts
 * Created on Sat Apr 10 2021 00:20:47
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
import UIterable from "../data-structure/UIterable";
import toList from "./toList";

/**
 * Reverse the linear arrange mode of iterable object.
 * @param i 
 * @returns 
 */
export default function reverse<E>(i: UIterable<E>): IIterable<E> {
    return toList(i, true);
}