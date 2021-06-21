import IIterator from "./IIterator"
/**
 * 指示某个对象可以进行迭代
 */
export default interface IIterable<E> {

    /**
     * 获取一个标准的TDSCore迭代器
     */
    getIterator(): IIterator<E>;
    
}