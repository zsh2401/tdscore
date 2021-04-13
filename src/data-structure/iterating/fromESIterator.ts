
/*
 * fromESIterator.ts
 * Created on Mon Apr 12 2021 09:28:10
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

export default function fromESIterator<E>
    (iterable: { [Symbol.iterator](): Iterator<E> }): IIterable<E> {

    function getIterator() {
        let iterator = iterable[Symbol.iterator]();

        let fakeCurrent = iterator.next()
        let realCurrent: IteratorResult<E> | null = null
        return {

            reset() {
                iterator = iterable[Symbol.iterator]()
                fakeCurrent = iterator.next()
                realCurrent = null
            },

            hasNext() {
                return (fakeCurrent.done ?? true) === false
            },

            next() {
                if (!this.hasNext()) {
                    throw new Error("There's no element more.")
                }
                realCurrent = fakeCurrent
                fakeCurrent = iterator.next()
                return realCurrent.value;
            },

            current() {
                return realCurrent?.value ?? null
            }
        }
    }
    
    return { getIterator }
}