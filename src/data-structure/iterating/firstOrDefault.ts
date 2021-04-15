import IIterable from "../IIterable";
import first from "./first";

export default function <E>(i: IIterable<E>, defaultValue: E): E {
    try {
        return first(i)
    } catch {
        return defaultValue
    }
}