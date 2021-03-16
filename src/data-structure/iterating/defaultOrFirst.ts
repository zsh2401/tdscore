import IIterable from "../IIterable";
export default function defaultOrFirst<E>(i: IIterable<E>, defaultValue: (E | null) = null): E | null {
    const it = i.getIterator();
    if (it.hasNext()) {
        return it.next();
    } else {
        return defaultValue;
    }
}