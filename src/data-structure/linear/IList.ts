import ICollection from "../ICollection";
import { Action1 } from "../../Action";
import IListIterator from "./IListIterator";
export default interface IList<E> extends ICollection<E> {

    /**
     * Get the count of elements.
     * @returns the count of elements.
     */
    size(): number;

    /**
     * Delete the element which at specified position.
     * @param position the invalid position of target element.
     */
    listDelete(position: number): void;

    /**
     * Insert a element to list.
     * @param position 
     * @param element 
     */
    listInsert(position: number, element: E): void;

    /**
     * Get the element which at specified position.
     * @param position 
     */
    listGet(position: number): E;

    /**
     * Replace a existed element.
     * @param position 
     * @param element 
     */
    listSet(position: number, element: E): void;

    /**
     * append an new element.
     * @param element 
     */
    listAdd(element: E): void;

    /**
     * Append all items
     * @param elements 
     */
    listAddAll(elements: E[]): void;

    /**
     * delete all elements.
     */
    listClear(): void;

    /**
     * find an element's position by hashcode
     * @param element 
     */
    listIndexOf(element: E): number;

    /**
     * Travers all element(s).
     * O(n)
     * @param element 
     */
    listForEach(element: Action1<E>): void;

    /**
     * Get list's iterator
     */
    getIterator(): IListIterator<E>;
}