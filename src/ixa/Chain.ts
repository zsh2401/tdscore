/*
 * Chain.ts
 * Created on Tue Apr 13 2021 22:25:23
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
import IList from "../data-structure/linear/IList";
import ISet from "../data-structure/set/ISet";
import IMap from "../data-structure/map/IMap";
import where from "./where";
import toList from "./toList";
import DSArray from "../DSArray";
import toDSArrayForItertable from "./toDSArrayForItertable";
import toSet from "./toSet";
import toMap from "./toMap";
import toJSArray from "./toJSArrayForItertable";
import select from "./select";
import IComparer from "../IComparer";
import quickSort from "../algorithm/sort/quickSort";
import size from "./size";
import last from "./last";
import reverse from "./reverse";
import contains from "./contains";
import isEmpty from "./isEmpty";
import append from "./append";
import getIterator from "./getIterator";
import IArrayLike from "../data-structure/../IArrayLike";
import LinkedList from "../data-structure/linear/LinkedList";
import max from "./max";
import min from "./min";
import IIterator from "../data-structure/IIterator";
import { Action1 } from "../Action";
import forEach from "./forEach";
import indexOf from "./indexOf"
import take from "./take";
import skip from "./skip";
import lastOrDefault from "./lastOrDefault";
import firstOrDefault from "./firstOrDefault"
import first from "./first";
import aggregate from "./aggregate";

/**
 * 流式操作对象，是对Iterating方法的封装，方便链式调用
 */
export default class Chain<E> extends DSObject implements IIterable<E> {

    private readonly iterable: IIterable<E>;

    constructor(iterable: (IIterable<E> | Iterable<E>)) {
        super()
        this.iterable = { getIterator: () => getIterator(iterable) }
    }

    getIterator(): IIterator<E> {
        return getIterator(this.iterable)
    }

    select<R>(selector: Func1<E, R>): Chain<R> {
        return new Chain(select(this.iterable, selector))
    }

    where(predicate: Func1<E, boolean>): Chain<E> {
        return new Chain(where(this.iterable, predicate))
    }

    take(count: number): Chain<E> {
        return new Chain(take(this.iterable, count))
    }

    skip(count: number): Chain<E> {
        return new Chain(skip(this.iterable, count))
    }

    size(): number {
        return size(this.iterable)
    }

    firstOrDefault(defaultValue: E): E | null {
        return firstOrDefault(this.iterable, defaultValue)
    }

    lastOrDefault(defaultValue: E): E {
        return lastOrDefault(this.iterable, defaultValue)
    }

    first(): E {
        return first(this.iterable)
    }

    last(): E | null {
        return last(this.iterable)
    }

    reverse(): Chain<E> {
        return new Chain(reverse(this.iterable))
    }

    contains(e: E): boolean {
        return contains(this.iterable, e)
    }

    isEmpty(): boolean {
        return isEmpty(this.iterable)
    }

    append(oneElement: E): Chain<E> {
        return new Chain(append(this.iterable, oneElement))
    }

    appendAll(elements: IArrayLike<E>): Chain<E> {
        return new Chain(append(this.iterable, elements))
    }

    max(comparer: IComparer<E>): E {
        return max(this.iterable, comparer)
    }

    min(comparer: IComparer<E>): E {
        return min(this.iterable, comparer)
    }

    aggregate(a: (a: E, b: E) => E, initialValue: E): E {
        return aggregate(this.iterable, a, initialValue)
    }

    forEach(consumer: Action1<E>): void {
        forEach(this, consumer)
    }

    indexOf(e: E): number {
        return indexOf(this, e)
    }

    orderBy(comparer: IComparer<E>): Chain<E> {
        const a = toDSArrayForItertable(this.iterable);
        quickSort(a, comparer)
        return new Chain(a);
    }

    sort(comparer: IComparer<E>): Chain<E> {
        return this.orderBy(comparer)
    }

    asList(): IList<E> {
        return toList(this.iterable)
    }

    asLinkedList(): LinkedList<E> {
        return toList(this.iterable) as LinkedList<E>;
    }

    asDSArray(): DSArray<E> {
        return toDSArrayForItertable(this.iterable)
    }

    asSet(): ISet<E> {
        return toSet(this.iterable)
    }

    asMap<K>(keyGenerator: Func1<E, K>): IMap<K, E> {
        return toMap(this.iterable, keyGenerator)
    }

    asJSArray(): E[] {
        return toJSArray(this.iterable)
    }
}