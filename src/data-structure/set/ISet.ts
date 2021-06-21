import ICollection from "../ICollection";

/**
 * Set标准接口
 */
export default interface ISet<E> extends ICollection<E> {
    /**
     * 向Set中添加元素
     * @param e 
     */
    setAdd(e: E): void

    /**
     * 移除一个Set中的元素
     * @param e 
     */
    setRemove(e: E): boolean

    /**
     * 清空Set
     */
    setClear():void
}