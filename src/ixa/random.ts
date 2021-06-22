/*
 * random.ts
 * Created on Mon Jun 21 2021 19:31:55
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

import { IIterator } from "../data-structure";
import IIterable from "../data-structure/IIterable";
import InvalidStateError from "../InvalidStateError";


/**
 * 获取一个无限产生随机数据的迭代器
 * @param generator 
 * @returns 
 */
export default function <E>(generator: IGenerator<E>): IIterable<E> {
    return {
        getIterator: () => new RandomIterator(generator)
    }
}

export interface IGenerator<E> {
    (): E
}
class RandomIterator<E> implements IIterator<E>{

    private readonly generator: IGenerator<E>

    private _current: E | null = null;
    private _started = false;
    constructor(generator: IGenerator<E>) {
        this.generator = generator
    }

    reset(): void {
        this._started = false;
    }

    hasNext(): boolean {
        return true;
    }

    next(): E {
        this._started = true
        this._current = this.generator()
        return this._current
    }

    current(): E {
        if (!this._started) {
            throw new InvalidStateError("cursor was just initalized!")
        }
        return this._current!;
    }


}