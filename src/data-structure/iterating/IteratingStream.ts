import IIterable from "../IIterable";
import DSObject from "../../DSObject";
import { Func1 } from "../../Func";
import IList from "../linear/IList";
import ISet from "../set/ISet";
import IMap from "../map/IMap";
import where from "./where";
import toList from "./toList";
import DSArray from "../../DSArray";
import toDSArrayForItertable from "./toDSArrayForItertable";
import toSet from "./toSet";
import toMap from "./toMap";
import toJSArray from "./toJSArrayForItertable";
import select from "./selectMany";
import defaultOrFirst from "./defaultOrFirst";
import IComparer from "../../algorithm/IComparer";
import qucikSort from "../../algorithm/sort/quickSort";

/**
 * 流式操作对象，是对Iterating方法的封装，方便链式调用
 */
export default class IteratingStream<E> extends DSObject {

    private readonly iterable: IIterable<E>;

    constructor(iterable: IIterable<E>) {
        super()
        this.iterable = iterable;
    }

    select<R>(selector: Func1<E, R>): IteratingStream<R> {
        return new IteratingStream(select(this.iterable, selector))
    }

    where(predicate: Func1<E, boolean>): IteratingStream<E> {
        return new IteratingStream(where(this.iterable, predicate))
    }

    defaultOrFirst(): E | null {
        return defaultOrFirst(this.iterable)
    }

    // Proposal: contact, union, repeat, reverse, max, min

    orderBy(comparer: IComparer<E>): IteratingStream<E> {
        const a = toDSArrayForItertable(this.iterable);
        qucikSort(a, comparer)
        return new IteratingStream(a);
    }

    asList(): IList<E> {
        return toList(this.iterable)
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