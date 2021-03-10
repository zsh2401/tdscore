import DSArray from "../../DSArray";
import { isJSArray } from "../../util/type";
import IIterable from "../IIterable";
import toJSArray from "./toJSArray";
export default function toDSArray<E, V = E>(iterable: IIterable<E> | E[], mapper?: ((e: E) => V)): DSArray<V> {
    mapper ??= function (e: E): V {
        //@ts-expect-error
        return e;
    }

    if (isJSArray(iterable)) {
        const result = new DSArray<V>(iterable.length);
        for (let i = 0; i < iterable.length; i++) {
            result[i] = mapper(iterable[i]);
        }
        return result;
    } else {
        const jsArray = toJSArray(iterable);
        return new DSArray(jsArray.length, (i: number) => mapper!(jsArray[i]));
    }
}