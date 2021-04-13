/*
 * toESIterator.ts
 * Created on Mon Apr 12 2021 09:23:23
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

import IIterable from "../IIterable";
import getIterator from "./getIterator";

export default function <E>(i: IIterable<E>): Iterator<E> {
    const iterator = getIterator<E>(i)
    return {
        next() {
            let value = undefined;
            let done: boolean = false

            try {
                if (iterator.hasNext()) {
                    value = iterator.next()
                } else {
                    done = true
                }
            } catch {
                done = true
            }

            //@ts-ignore
            const r: IteratorResult<E> = {
                value,
                done
            }
            return r;
        }
    }
}