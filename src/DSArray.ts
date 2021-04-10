/*
 * DSArray.ts
 * Created on Wed Mar 10 2021 19:54:56
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

import DSObject from "./DSObject";
import IIterable from "./data-structure/IIterable";
import IIterator from "./data-structure/IIterator";
import find from "./data-structure/iterating/find"
import toJSArray from "./data-structure/iterating/toJSArrayForItertable";
import hashCode from "./util/hashing";
import IArrayLike from "./IArrayLike";

/**
 * 默认数据提供器
 * --
 * Default value provider.
 * Only be called once when the target index was not initialized.
 */
type DefaultValue<E> = ((i: number) => E) | E;

/**
 * 
 * 限制性，不可变长的数组，类似于C系语言中的所有的一般。
 * 用于模拟数据结构中对数组的严格操作。
 * 不要继承此类
 * 
 * Stricted, length-fixed array, like C, C++, C# and Java etc.
 * DO NOT EXTENDS THIS OBJECT
 * 
 */
//@ts-expect-error
@dsarry
export default class DSArray<E> extends DSObject implements IArrayLike<E>, IIterable<E>{

    readonly length: number;

    private readonly defaultValue?: DefaultValue<E>;

    constructor(size: number, defaultValue?: DefaultValue<E>) {
        super();
        this.length = size;
        this.defaultValue = defaultValue;
    }

    toDSArray(): DSArray<E> {
        return this;
    }

    // defaultValueOf(i: number): E | undefined {
    //     if (typeof this.defaultValue === "function") {
    //         //@ts-ignore
    //         return this.defaultValue(i);
    //     } else {
    //         return this.defaultValue;
    //     }
    // }

    getIterator(): IIterator<E> {
        return new DSArrayIterator(this);
    }

    [index: number]: E;

    readonly length: number;

    /**
     * 
     * @deprecated use indexer. e.g array[0]
     * @param index 
     */
    get(index: number): E {
        return this[index];
    }

    /**
     * 
     * @deprecated use indexer. e.g array[0]
     * @param index 
     * @param value 
     */
    set(index: number, value: E): void {
        this[index] = value;
    }

    copyTo(dest: IArrayLike<E>, start?: number, length?: number): void {
        start ??= 0;
        length ??= this.length;
        for (let i = start; i < start + length && i < dest.length; i++) {
            dest[i - start] = this[i];
        }
    }

    contains(v: E): boolean {
        const h = hashCode(v);
        return find(this, (it) => hashCode(it) === h) !== null;
    }

    toJSArray(): E[] {
        return toJSArray(this);
    }

    static from<E>(src: ArrayLike<E>): DSArray<E> {
        return from(src);
    }

    static copy<E>(src: DSArray<E>, dest: DSArray<E>, start?: number, count?: number): void {
        return copy(src, dest, start, count);
    }

}
function dsarry(
    constructor: (new (length: number, defaultValue?: DefaultValue<any>) => DSArray<any>)
): (new (length: number, defaultValue?: DefaultValue<any>) => DSArray<any>) {
    //@ts-ignore
    const result = function (length: number, defaultValue?: DefaultValue): {} {
        const dsarray: DSArray<any> = new constructor(length);
        const handler: ProxyHandler<DSArray<any>> = {
            get: (target, p) => {
                const [isNumber, isValidIndex, index] = toIndex(target.length, p);
                if (isValidIndex) {
                    let v = target[index];
                    if (typeof v === "undefined" && defaultValue !== undefined) {
                        v = (typeof defaultValue === "function" ? defaultValue(index) : defaultValue);
                        target[index] = v;
                    }
                    return v;
                } else if (isNumber) {
                    throw new RangeError(`Index out of range ${String(p)}`);
                } else {
                    //@ts-ignore
                    return target[p];
                }
            }
        }

        return new Proxy(dsarray, handler);
    }

    result.copy = copy;
    result.from = from;
    //@ts-ignore
    return result;
}
function from<E>(src: ArrayLike<E>): DSArray<E> {
    const a = new DSArray<E>(src.length);
    for (let i = 0; i < src.length; i++) {
        a[i] = src[i];
    }
    return a;
}

function copy<E>(src: DSArray<E>, dest: DSArray<E>, start?: number, count?: number): void {
    start ??= 0;
    count ??= dest.length;
    for (let i = 0; i < count; i++) {
        dest[i] = src[start + i];
    }
}
function toIndex<E>(len: number, p: any): [isNumber: boolean, isValid: boolean, validIndex: number] {
    if (typeof p === "symbol") {
        p = "NaN"
    }
    var n = Number(p);
    return [!isNaN(n), n >= 0 && n < len, n];
}
class DSArrayIterator<E> implements IIterator<E>{
    private position = -1;
    private array: DSArray<E>;
    constructor(array: DSArray<E>) {
        this.array = array;
    }
    reset(): void {
        this.position = -1;
    }
    hasNext(): boolean {
        const nextPosition = this.position + 1;
        const inRange = nextPosition < this.array.length && nextPosition >= 0;
        if (inRange) {
            return this.array.get(nextPosition) !== undefined;
        } else {
            return false;
        }
    }
    next(): E {
        return this.array[++this.position]!;
    }
    current(): E {
        return this.array[this.position]!;
    }
}