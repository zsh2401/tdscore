import IIterable from "../IIterable";
import getIterator from "./getIterator";
export default function defaultOrFirst<E>(i: IIterable<E>, defaultValue: (E | null) = null): E | null {
    const it = getIterator<E>(i)
    if (it.hasNext()) {
        return it.next();
    } else {
        return defaultValue;
    }
}