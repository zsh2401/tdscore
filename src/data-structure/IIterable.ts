import IIterator from "./IIterator"
/**
 * 指示某个对象可以进行迭代
 */
export default interface IIterable<E> {
    getIterator(): IIterator<E>;
}