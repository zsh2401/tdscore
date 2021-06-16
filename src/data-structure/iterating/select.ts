/*
 * select.ts
 * Created on Tue Apr 13 2021 20:50:07
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
import IIterator from "../IIterator";
import UIterable from "../UIterable";
import getIterator from "./getIterator";
import size, { IOptionalSizeMethodOptimized, optimizedSizeGetter } from "./size";
export type Selector<E, V> = (e: E) => V;

export default function select<E, V>(i: UIterable<E>, selector: Selector<E, V>): IIterable<V> {
    return new SelectIterable(i, selector)
}

class SelectIterable<E, V> implements IIterable<V>,
    IOptionalSizeMethodOptimized {

    private readonly selector: Selector<E, V>
    private readonly source: UIterable<E>
    constructor(source: UIterable<E>, selector: Selector<E, V>) {
        this.selector = selector
        this.source = source
    }

    [optimizedSizeGetter]() {
        return size(this.source)
    }

    getIterator() {
        return new SelectIterator(this.source, this.selector)
    }
}
class SelectIterator<E, V> implements IIterator<V>{

    private readonly iterator: IIterator<E>
    private readonly selector: Selector<E, V>

    constructor(source: UIterable<E>, selector: Selector<E, V>) {
        this.iterator = getIterator(source)
        this.selector = selector
    }

    reset(): void {
        this.iterator.reset()
    }

    hasNext(): boolean {
        return this.iterator.hasNext()
    }

    next(): V {
        return this.selector(this.iterator.next())
    }

    current(): V {
        return this.selector(this.iterator.current())
    }

}