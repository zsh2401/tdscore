import { IIterable, IIterator } from "..";
import NoMoreElementError from "../NoMoreElementError";

/*
 * range.ts
 * Created on Thu Apr 15 2021 14:26:54
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
export default function (from: number, to: number): IIterable<number> {
    return {
        getIterator: () => new Ranger(from, to)
    }
}

class Ranger implements IIterator<number>{
    private readonly from: number
    private readonly to: number
    private value: number
    constructor(from: number, to: number) {
        this.from = from
        this.to = to
        this.value = from - 1
    }
    reset(): void {
        this.value = this.from
    }

    hasNext(): boolean {
        return this.value < this.to
    }

    next(): number {
        if (this.value < this.to) {
            return ++this.value
        } else {
            throw new NoMoreElementError()
        }
    }

    current(): number {
        if (this.value < this.from) {
            throw new Error("has not iterated")
        }
        return this.value
    }
}
