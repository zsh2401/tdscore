import UIterable from "../data-structure/UIterable";
import getIterator from "./getIterator";

/**
 * Check the collection in the iterable object is empty.
 * 
 * @param i 
 * @returns 
 */
export default function isEmpty<E>(i: UIterable<E>): boolean {
    return !getIterator<E>(i).hasNext();
}