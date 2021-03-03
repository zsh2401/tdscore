import IIterable from "../IIterable";
export default function last<E>(i: IIterable<E>): E {
    const iterator = i.getIterator();
    while (iterator.hasNext()) {
        const v = iterator.next();
        if (!iterator.hasNext()) {
            return v;
        }
    }
    throw new Error("There's no any element");
}