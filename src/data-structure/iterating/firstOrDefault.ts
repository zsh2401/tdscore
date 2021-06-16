import IIterable from "../IIterable";
import UIterable from "../UIterable";
import first from "./first";

export default function <E>(i: UIterable<E>, defaultValue: E): E {
    try {
        return first(i)
    } catch {
        return defaultValue
    }
}