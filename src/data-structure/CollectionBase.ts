/*
 * CollectionBase.ts
 * Created on Mon Jun 21 2021 18:27:44
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

import DSArray from "../DSArray"
import DSObject from "../DSObject"
import contains from "../ixa/contains"
import size, { IOptionalSizeMethodOptimized, optimizedSizeGetter } from "../ixa/size"
import IIterator from "./IIterator"
import ICollection from "./ICollection"
import IClonable from "./IClonable"
import { Action1 } from "../Action"
import toDSArray from "../ixa/toDSArrayForItertable"
import forEach from "../ixa/forEach"
import { Func1 } from "../Func"
import equals from "../equals"
import toESIterator from "../ixa/toESIterator"
import NotImplementedError from "../NotImplementedError"

/**
 * 集合的基础类
 * 提供了集合的一些基础通用功能，任何集合继承自此类，
 * 可以一定程度上复用部分代码
 */
export default abstract class CollectionBase<E>
    extends DSObject implements
    ICollection<E>,
    IClonable<ICollection<E>>,
    IOptionalSizeMethodOptimized {

    constructor() {
        super();
    }
    collectionForEach(consumer: Action1<E>): void {
        this.forEach(consumer)
    }
    collectionMap<T>(consumer: Func1<E, T>): DSArray<T> {
        return this.map(consumer)
    }

    /**
     * 向集合中新增一个元素
     * @param e 
     */
    abstract collectionAdd(e: E): void;

    /**
     * 移除一个集合中的元素
     * @param e 
     */
    abstract collectionRemove(e: E): boolean;

    /**
     * 清空集合
     */
    abstract collectionClear(): void;

    /**
     * 遍历集合元素
     * @param consumer 
     */
    forEach(consumer: Action1<E>): void {
        forEach(this, consumer)
    }

    /**
     * 映射全部集合元素
     * 调用该方法，可以将每个元素由E转换为T
     * @param mapper 
     * @returns 
     */
    map<T>(mapper: Func1<E, T>): DSArray<T> {
        return toDSArray(this, mapper);
    }

    /**
     * 克隆集合
     * 目前暂未实现
     */
    clone(): ICollection<E> {
        // throw new Error("This method has not been implemented now because of cycle dependency");
        throw new NotImplementedError();
    }

    /**
     * 判断集合是否为空
     * @returns 
     */
    collectionIsEmpty(): boolean {
        return this.collectionSize() === 0;
    }

    /**
     * 判断集合中是否包含某个元素
     * 其内部基于了tdscore.equals方法
     * @param e 
     * @returns 
     */
    collectionContains(e: E): boolean {
        const i = this.getIterator();
        while (i.hasNext()) {
            if (equals(i.next(), e)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 转换为DSArray<E>
     * @returns 
     */
    collectionToArray(): DSArray<E> {
        const a = new DSArray<E>(this.size());
        const iterator = this.getIterator();
        for (let i = 0; i < this.size(); i++) {
            a[i] = iterator.next();
        }
        return a;
    }

    /**
     * 转换为JS数组
     * @returns 
     */
    collectionToJSArray(): E[] {
        const i = this.getIterator();
        const v: E[] = [];
        while (i.hasNext()) {
            v.push(i.next());
        }
        return v;
    }

    /**
     * 检查集合是否为只读
     * @returns 
     */
    collectionIsReadOnly(): boolean {
        return false;
    }

    /**
     * 获取集合内的元素数量
     * @returns 
     */
    collectionSize(): number {
        return this.size();
    }


    /**
     * 将集合内部元素复制到一个新的数组中
     */
    toJSArray(): E[] {
        return this.collectionToJSArray();
    }

    /**
     * 获取任意一个集合内的元素
     * @returns 任意元素
     */
    collectionAny(): E {
        const i = this.getIterator();
        if (i.hasNext()) {
            return i.next();
        } else {
            throw new Error("This collection contains no element.");
        }
    }

    /**
     * 清空
     * @deprecated
     */
    clear(): void {
        this.collectionClear();
    }

    /**
     * 集合大小
     * @returns 
     */
    size(): number {
        return size(this);
    }

    /**
     * 判断集合内是否包含某个元素
     * @param o 
     * @returns 
     * @deprecated
     */
    contains(o: E): boolean {
        return contains(this, o);
    }

    /**
     * 获取tdscore迭代器
     */
    abstract getIterator(): IIterator<E>;

    /**
     * 判断集合是否为空
     * @returns 
     * @deprecated
     */
    isEmpty(): boolean {
        return this.collectionIsEmpty()
    }

    /**
     * 转换为tdscore DSArray
     * @deprecated
     * @returns 
     */
    toArray(): DSArray<E> {
        return this.collectionToArray()
    }

    /**
     * 获取原生ECMAScript 6 Iterator
     * @returns 
     */
    [Symbol.iterator](): Iterator<E> {
        return toESIterator(this)
    }

    /**
     * 针对IXA进行优化的大小获取函数
     * @returns 
     */
    [optimizedSizeGetter](): number {
        return this.collectionSize()
    }
}