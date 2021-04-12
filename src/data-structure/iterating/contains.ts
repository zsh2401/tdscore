import IIterable from "../IIterable";
import indexOf from "./indexOf";
export const optimizedContainsMethod = Symbol("hidden optimized contains method")
export interface IOptionalContainsOptimized {
    [optimizedContainsMethod]?: () => boolean
}
export default function contains<E>(i: (IOptionalContainsOptimized & IIterable<E>), e: E)
    : boolean {
    const hidden = i[optimizedContainsMethod]
    if (hidden && typeof hidden === "function") {
        //not hidden() for fuck js this
        return i[optimizedContainsMethod]?.() ?? false
    } else {
        return indexOf(i, e) !== -1;
    }
}