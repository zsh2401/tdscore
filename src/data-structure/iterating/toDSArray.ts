import DSArray from "../../DSArray";
import { isJSArray } from "../../util/type-checking";
import IIterable from "../IIterable";
import toJSArray from "./toJSArray";
export default function toDSArray<E, V = E>(iterable: IIterable<E> | E[], mapper?: ((e: E) => V)): DSArray<V> {
    mapper ??= function (e: E): V {
        //@ts-expect-error
        return e;
    }
    if (isJSArray(iterable)) {
        return new DSArray(iterable.length, (i: number) => mapper!(iterable[i]));
    } else {
        const jsArray = toJSArray(iterable);
        return new DSArray(jsArray.length, (i: number) => mapper!(jsArray[i]));
    }
}