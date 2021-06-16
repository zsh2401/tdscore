import { Func2 } from "../../Func";
import UIterable from "../UIterable";
import getIterator from "./getIterator";

export default function forEach<E>(i: UIterable<E>, visitor: Func2<E, number, boolean | void>): void {
    const iterator = getIterator<E>(i)
    for (let i = 0; iterator.hasNext(); i++) {
        const r = visitor(iterator.next(), i);
        if (typeof r === "boolean" && r === false) {
            break;
        }
    }
}