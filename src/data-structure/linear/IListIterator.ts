import Iterator from "../IIterator"
export default interface IListIterator<E > extends Iterator<E>{
    hasPrevious():boolean;
    previous():E;
}