import IIterable from "../IIterable";
import UIterable from "../UIterable";
import getIterator from "./getIterator";
export const optimizedSizeGetter = Symbol("hidden optimized symbol")
export interface IOptionalSizeMethodOptimized {
    [optimizedSizeGetter]?: () => number
}
export default function size<E>(i: (UIterable<E> & IOptionalSizeMethodOptimized)) {
    const hidden = i[optimizedSizeGetter]

    if (hidden && typeof hidden === "function") {
        return i[optimizedSizeGetter]?.() ?? 0
    }

    const iterator = getIterator(i)
    let _size = 0;
    while (iterator.hasNext()) {
        _size++;
        iterator.next()
    }
    return _size;
}