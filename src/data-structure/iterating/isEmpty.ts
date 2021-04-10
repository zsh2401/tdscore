import IIterable from "../IIterable";

/**
 * Check the collection in the iterable object is empty.
 * 
 * @param i 
 * @returns 
 */
export default function isEmpty<E>(i: IIterable<E>): boolean {
    return !i.getIterator().hasNext();
}