/*
 * BitSpan.ts
 * Created on Wed Mar 03 2021 23:54:13
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
 * Mulan Permissive Software License，Version 2
 */

import IIterable from "../IIterable";
import IIterator from "../IIterator"
import DSObject from "../../DSObject";
import DSArray from "../../DSArray";
import MixedNumber from "../../MixedNumber";
import toJSArrayForItertable from "../../ixa/toJSArrayForItertable"
import IList from "./IList";
import UngrowableArrayList from "./UngrowableArrayList";

//TODO
export default class BitSpan extends DSObject implements IIterable<boolean>{

    private container: IList<boolean>;
    private readonly len;

    get length(): number {
        return this.len;
    }

    constructor(data: boolean[]) {
        super();
        this.container = new UngrowableArrayList(data.length)
        this.len = data.length;
        data.forEach((d) => this.container.listAdd(d));
    }

    leftShift(count: number): BitSpan {
        const result: boolean[] = [];
        for (; result.length < this.container.listSize();) {
            result.push(false)
        }
        for (let i = count; i < this.container.listSize(); i++) {
            result[i - count] = this.container.listGet(i)
        }
        return new BitSpan(result);
    }

    rightShift(count: number) {
        const result: boolean[] = [];
        for (; result.length < this.container.listSize();) {
            result.unshift(false)
        }
        for (let i = count; i < this.container.listSize(); i++) {
            result[i] = this.container.listGet(i - count)
        }
        return new BitSpan(result);
    }

    toJSArray(): boolean[] {
        return this.container.collectionToJSArray()
    }


    or(other: BitSpan): BitSpan {
        if (other.length !== this.length) {
            throw new Error("Array lengths must be the same");
        }
        const result: boolean[] = [];
        for (let i = 0; i < this.length; i++) {
            result[i] = this.at(i) || other.at(i)
        }
        return new BitSpan(result);
    }

    and(other: BitSpan): BitSpan {
        if (other.length !== this.length) {
            throw new Error("Array lengths must be the same");
        }
        const result: boolean[] = [];
        for (let i = 0; i < this.length; i++) {
            result[i] = this.at(i) && other.at(i)
        }
        return new BitSpan(result);
    }

    nor(other: BitSpan): BitSpan {
        if (other.length !== this.length) {
            throw new Error("Array lengths must be the same");
        }
        const result: boolean[] = [];
        for (let i = 0; i < this.length; i++) {
            result[i] = !(this.at(i) || other.at(i))
        }
        return new BitSpan(result);
    }

    at(index: number, value?: boolean): boolean {
        if (value !== undefined) {
            this.container.listSet(index, value)
            return value;
        } else {
            return this.container.listGet(index)
        }
    }

    setAll(value: boolean): BitSpan {
        const result: boolean[] = []
        for (let i = 0; i < this.length; i++) {
            result[i] = value
        }
        return new BitSpan(result)
    }

    not(): BitSpan {
        const result: boolean[] = [];
        for (let i = 0; i < this.length; i++) {
            result[i] = !this.at(i)
        }
        return new BitSpan(result);
    }

    xor(other: BitSpan): BitSpan {
        if (other.length !== this.length) {
            throw new Error("Array lengths must be the same");
        }
        const result: boolean[] = [];
        for (let i = 0; i < this.length; i++) {
            result[i] = this.at(i) !== other.at(i)
        }
        return new BitSpan(result);
    }

    getIterator(): IIterator<boolean> {
        return this.container.getIterator();
    }

    static of(...rest: (boolean | MixedNumber)[]): BitSpan {
        // throw new Error();
        //TODO
        const result = new UngrowableArrayList<boolean>(rest.length);
        rest.forEach(element => {
            if (typeof element === "boolean") {
                result.listAdd(element);
            } else {
                // const bitArray = Number.par
                // result.listAddAll()
            }
        });
        return new BitSpan(result.toJSArray());
    }

    static ofDSA(data: DSArray<(boolean | MixedNumber)>) {
        BitSpan.of(...toJSArrayForItertable(data))
    }
}