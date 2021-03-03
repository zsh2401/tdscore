export default interface IIterator<E> {

    /**
     * Reset the position of cursor.
     */
    reset(): void;

    /**
     * Check if there is next element.
     */
    hasNext(): boolean;

    /**
     * Move to next element and returns it.
     */
    next(): E;

    /**
     * Get element on current position.
     */
    current(): E;
}