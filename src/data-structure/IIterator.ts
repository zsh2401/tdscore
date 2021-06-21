/**
 * TDSCore迭代器标准
 */
export default interface IIterator<E> {

    /**
     * 重新设置指针的位置
     */
    reset(): void;

    /**
     * 判断是否还有下一个可迭代元素
     */
    hasNext(): boolean;

    /**
     * 移动指针到下一个元素，并将其返回
     * @returns 指针最新位置的元素
     */
    next(): E;

    /**
     * 获取当前指针所在位置的元素，但不会修改指针
     */
    current(): E;
}