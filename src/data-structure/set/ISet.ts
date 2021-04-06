import ICollection from "../ICollection";

export default interface ISet<E> extends ICollection<E> {
    setAdd(e: E): void
    setRemove(e: E): boolean
    setClear():void
}