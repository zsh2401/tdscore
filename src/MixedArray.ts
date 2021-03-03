import DSObject from "./DSObject";
import getIterator from "./data-structure/iterating/getIterator";
import DSArray, { copyToDSArray, from } from "./DSArray";

type MixedArray<E> = DSArray<E> | E[];
export default MixedArray;
export function toDSArray<E>(array: MixedArray<E>): DSArray<E> {
    if (DSObject.isDSObject(array)) {
        return array as DSArray<E>;
    } else {
        return copyToDSArray((array as E[]));
    }
}
export function toJSArray<E>(array: MixedArray<E>): E[] {

    if (DSObject.isDSObject(array)) {
        return toJSArray((array as DSArray<E>));
    } else {
        return array as E[];
    }
}