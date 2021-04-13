import IIterable from "../IIterable";
import getIterator from "./getIterator";
export default function last<E>(i: IIterable<E>): E | null {
    const iterator = getIterator<E>(i)
    while (iterator.hasNext()) {
        const v = iterator.next();
        if (!iterator.hasNext()) {
            return v;
        }
    }
    return null;
}