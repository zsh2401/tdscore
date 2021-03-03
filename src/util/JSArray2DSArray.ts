import DSArray from "../DSArray";

/**
 * 
 * @deprecated
 * @param a 
 */
export default function <E>(a: E[]): DSArray<E> {
    return new DSArray(a.length, (i: number) => a[i])
}