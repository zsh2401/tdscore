import IIterable from "../IIterable";
import getIterator from "./getIterator";

/**
 * Check the collection in the iterable object is empty.
 * 
 * @param i 
 * @returns 
 */
export default function isEmpty<E>(i: IIterable<E>): boolean {
    return !getIterator<E>(i).hasNext();
}