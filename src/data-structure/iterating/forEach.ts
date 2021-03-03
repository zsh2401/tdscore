import { Func2 } from "../../Func";
import IIterable from "../IIterable";

export default function forEach<E>(i: IIterable<E>, visitor: Func2<E, number, boolean | void>): void {
    const iterator = i.getIterator();
    for (let i = 0; iterator.hasNext(); i++) {
        const r = visitor(iterator.next(), i);
        if (typeof r === "boolean" && r === false) {
            break;
        }
    }
}