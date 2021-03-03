import IIterable from "../IIterable";
import toList from "./toList";
export default function reverse<E>(i: IIterable<E>): IIterable<E> {
    return toList(i, true);
};