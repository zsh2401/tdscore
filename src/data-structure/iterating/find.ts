import { Func2 } from "../../Func";
import IIterable from "../IIterable";

export default function find<E>(i: IIterable<E>,
    visitor: Func2<E, number, boolean>): E | null {
    const iterator = i.getIterator();
    for (let i = 0; iterator.hasNext(); i++) {
        const v = iterator.next();
        const r = visitor(v, i);
        if (r === true) {
            return v;
        }
    }
    return null;
}