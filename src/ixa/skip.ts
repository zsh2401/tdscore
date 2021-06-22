/*
 * skip.ts
 * Created on Thu Apr 15 2021 13:58:30
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

import ElementNotFoundError from "../data-structure/NoMoreElementError";
import IIterable from "../data-structure/IIterable";
import IIterator from "../data-structure/IIterator"
import UIterable from "../data-structure/UIterable";
import getIterator from "./getIterator";

export default function <E>(iterable: UIterable<E>,
    count: number): IIterable<E> {
    return {
        getIterator: () => new SkipIterator(getIterator(iterable), count)
    }
}
class SkipIterator<E> implements IIterator<E>{

    private readonly source: IIterator<E>
    private readonly count: number
    private status: "new" | "moved" | "failed"

    constructor(source: IIterator<E>, count: number) {
        this.source = source
        this.count = count
        this.status = "new"
    }
    reset() {
        this.source.reset()
        this.status = "new"
    }
    private moveToRightPlace() {
        for (let i = 0; i < this.count; i++) {
            if (this.source.hasNext()) {
                this.source.next()
                this.status = "moved"
            } else {
                this.status = "failed"
                return
            }
        }
    }

    hasNext() {
        if (this.status === "new") {
            this.moveToRightPlace()
        }
        return this.source.hasNext()
    }
    current() {
        if (this.status === "new") {
            this.moveToRightPlace()
        } else if (this.status === "failed") {
            throw new ElementNotFoundError()
        }
        return this.source.current()
    }

    next() {
        if (this.status === "new") {
            this.moveToRightPlace()
        }
        return this.source.next()
    }
}