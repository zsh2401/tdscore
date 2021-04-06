import { Func2 } from "../../Func";
import IIterable from "../IIterable";

export default function find<E>(i: IIterable<E>,
    finder: Func2<E, number, boolean>): E | null {
    const iterator = i.getIterator();
    for (let i = 0; iterator.hasNext(); i++) {
        const v = iterator.next();
        if (finder(v, i)) {
            return v;
        }
    }
    return null;
}