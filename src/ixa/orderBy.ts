import { LinkedList } from "../data-structure";
import IIterable from "../data-structure/IIterable";
import UIterable from "../data-structure/UIterable";
import IComparer from "../IComparer";
import NotImplementedError from "../NotImplementedError";
import getIterator from "./getIterator";

export default function <E>(iterable: UIterable<E>, comparaer: IComparer<E>): IIterable<E> {
    const iterator = getIterator<E>(iterable)
    const innerList = new LinkedList<E>()

    //TODO 考虑使用折半插入排序
    throw new NotImplementedError()
}