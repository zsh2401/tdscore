import IIterable from "../IIterable";

export default function isEmpty<E>(i: IIterable<E>): boolean {
    return !i.getIterator().hasNext();
}