import IIterable  from "../IIterable";
import indexOf from "./indexOf";

export default function contains<E>(i: IIterable<E>, e: E) {
    return indexOf(i, e) !== -1;
}