import IIterable from "../IIterable";
import dsEquals from "../../dsEquals";

/**
 * get the index of spcified element in a iterable object.
 * Time complexity O(n)
 * Space complexity O(1)
 * @param i iterable object
 * @param e the element to be found.
 * @returns index number if found or -1 if not found.
 */
export default function indexOf<E>(i: IIterable<E>, e: E): number {
    const iterator = i.getIterator()
    for (let i = 0; iterator.hasNext(); i++) {
        const current = iterator.next();
        if (dsEquals(e, current)) {
            return i;
        }
    }
    return -1;
}