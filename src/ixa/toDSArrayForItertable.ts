import DSArray from "../DSArray";
import UIterable from "../data-structure/UIterable";
import toJSArray from "./toJSArrayForItertable";
export default function toDSArray<E, V = E>(iterable: UIterable<E>, mapper?: ((e: E) => V)): DSArray<V> {

    mapper ??= function (e: E): V {
        return e as unknown as V;
    }

    const jsArray = toJSArray<E, E>(iterable);
    return new DSArray<V>(jsArray.length, (i: number) => mapper!(jsArray[i]))
}