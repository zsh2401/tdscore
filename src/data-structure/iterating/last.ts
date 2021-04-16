import { Func1 } from "../../Func";
import IIterable from "../IIterable";
import getIterator from "./getIterator";
export default function last<E>(i: IIterable<E>, predicate?: Func1<E, boolean>): E {
    const iterator = getIterator<E>(i)
    let last: E | null = null
    while (iterator.hasNext()) {
        const v = iterator.next();
        if (predicate) {
            if (predicate(v)) {
                last = v
            }
        } else {
            last = v
        }
    }
    if (last !== null) {
        return last
    } else {
        throw new Error("Last element not found")
    }
}