import IIterable from "../IIterable";
import indexOf from "./indexOf";
export const optimizedContainsMethod = Symbol("hidden optimized contains method")
export interface IOptionalContainsOptimized<E> {
    [optimizedContainsMethod]?: (target: E) => boolean
}
export default function contains<E>(i: (IOptionalContainsOptimized<E> & IIterable<E>), e: E)
    : boolean {
    const hidden = i[optimizedContainsMethod]
    if (hidden && typeof hidden === "function") {
        return i[optimizedContainsMethod]?.(e) ?? false
    } else {
        return indexOf(i, e) !== -1;
    }
}