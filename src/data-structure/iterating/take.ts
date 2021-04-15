/*
 * take.ts
 * Created on Thu Apr 15 2021 14:16:06
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

import { IIterator } from "..";
import IIterable from "../IIterable";
import getIterator from "./getIterator";

export default function <E>(iterable: IIterable<E>, count: number): IIterable<E> {
    return {
        getIterator: () => new TakeIterator(getIterator(iterable), count)
    }
}
class TakeIterator<E> implements IIterator<E>{

    private readonly count: number
    private readonly source: IIterator<E>
    private took: number
    constructor(source: IIterator<E>, count: number) {
        this.source = source
        this.count = count
        this.took = 0
    }

    reset(): void {
        this.source.reset()
        this.took = 0
    }
    hasNext(): boolean {
        return this.took <= this.count && this.source.hasNext()
    }
    next(): E {
        if (this.took <= this.count) {
            this.took++
            return this.next()
        } else {
            throw new Error("There's no more element")
        }
    }
    current(): E {
        if (this.took <= this.count) {
            return this.source.current()
        } else {
            throw new Error("There's no element")
        }
    }

}