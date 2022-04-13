/*
 * where.ts
 * Created on Tue Jun 22 2021 08:56:35
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
import DSObject from "../DSObject";
import { Func1 } from "../Func";
import IIterator from "../data-structure/IIterator";
import getIterator from "./getIterator";
import UIterable from "../data-structure/UIterable";

/**
 * 
 * You can understand this function as Array.filter with lazy load.
 * 
 * THIS IS ANOTHER LAZY LOAD ITERATING FUNCTION
 * 
 * @param i 
 * @param predicate 
 * @returns 
 */
export default function where<E>(i: UIterable<E>, predicate: Func1<E, boolean>): IIterable<E> {
    return new WhereIterable(i, predicate);
}

class WhereIterable<E> extends DSObject implements IIterable<E> {
    private readonly predicate: Func1<E, boolean>;
    private readonly source: UIterable<E>;

    constructor(source: UIterable<E>, predicate: Func1<E, boolean>) {
        super();
        this.predicate = predicate;
        this.source = source;
    }
    getIterator(): IIterator<E> {
        return new WhereIterator(getIterator<E>(this.source), this.predicate);
    }
}

class WhereIterator<E> implements IIterator<E>{

    private readonly source: IIterator<E>;
    private readonly predicate: Func1<E, boolean>;
    private moved: boolean = false;
    private logicCurrent: E = undefined!;
    private interatedOnce = false;

    constructor(source: IIterator<E>, predicate: Func1<E, boolean>) {
        this.source = source;
        this.predicate = predicate;
    }

    private moveToNextAvailable(): boolean {
        while (this.source.hasNext()) {
            const element = this.source.next()
            if (this.predicate(element)) {
                this.moved = true
                return true
            }
        }
        return false
    }

    hasNext() {
        if (this.moved === false) {
            this.moved = this.moveToNextAvailable()
        }
        return this.moved
    }

    reset() {
        this.moved = false
        this.interatedOnce = false;
        this.current = undefined!;  
        this.source.reset();
    }

    current() {
        if (!this.interatedOnce) {
            throw new Error()
        } else {
            return this.logicCurrent;
        }
    }

    next(): E {
        if (this.moved === false) {
            this.moved = this.moveToNextAvailable()
        }
        if (this.moved === false) {
            throw new Error("There's no more element!")
        }
        this.moved = false;
        this.logicCurrent = this.source.current()
        this.interatedOnce = true;
        return this.logicCurrent;
    }
}