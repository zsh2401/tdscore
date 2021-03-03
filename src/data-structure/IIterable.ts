import IIterator from "./IIterator"
export default interface IIterable<E> {
    getIterator(): IIterator<E>;
}