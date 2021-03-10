import { IIterable } from "..";
import { isIterable, isJSArray } from "../../util/type";
import IIterator from "../IIterator";
import toDSArray from "./toDSArray";

export default function <E>(e: IIterable<E> | E[] | any): IIterator<E> {
    if (isIterable<E>(e)) {
        return e.getIterator();
    } else if (isJSArray<E>(e)) {
        return toDSArray(e).getIterator();
    } else {
        return toDSArray([e]).getIterator();
    }
}