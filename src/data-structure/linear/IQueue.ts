import ICollection from "../ICollection";
import IIterable from "../IIterable";

/**
 * D = {ai | ai (- ElemSet,i = 1,2,...,n, n>= 0}
 * Rl = {<ai-1>,ai> | ai-1,a (- D,I = 2,...n )}
 */
export default interface IQueue<E> extends ICollection<E>, IIterable<E> {

    /**
     * Clear all element(s).
     */
    clear(): void;

    /**
     * Get the head of queue.
     */
    queueGetHead(): E;

    /**
     * Insert new element to the end of queue.
     * @param e 
     */
    queueEn(e: E): void;

    /**
     * Dequeue an element.
     */
    queueDe(): E;
}