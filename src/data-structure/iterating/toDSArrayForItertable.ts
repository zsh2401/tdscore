import DSArray from "../../DSArray";
import IIterable from "../IIterable";
import toJSArray from "./toJSArrayForItertable";
export default function toDSArray<E, V = E>(iterable: IIterable<E>, mapper?: ((e: E) => V)): DSArray<V> {
    mapper ??= function (e: E): V {
        //@ts-expect-error
        return e;
    }
    const jsArray = toJSArray(iterable);
    return new DSArray(jsArray.length, (i: number) => mapper!(jsArray[i]));
}