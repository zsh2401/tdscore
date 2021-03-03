import IIterable from "../IIterable";
export default function size<E>(i: IIterable<E>) {
    const iterator = i.getIterator();
    let _size = 0;
    while (iterator.hasNext()) {
        _size++;
        iterator.next();
    }
    return _size;
}