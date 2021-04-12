import IIterable from "../IIterable";
export const optimizedSizeGetter = Symbol("hidden optimized symbol")
export interface IOptionalSizeMethodOptimized {
    [optimizedSizeGetter]?: () => number
}
export default function size<E>(i: (IIterable<E> & IOptionalSizeMethodOptimized)) {
    const hidden = i[optimizedSizeGetter]
    if (hidden && typeof hidden === "function") {
        return i[optimizedSizeGetter]?.() ?? 0
    }
    
    const iterator = i.getIterator();
    let _size = 0;
    while (iterator.hasNext()) {
        _size++;
        iterator.next();
    }
    return _size;
}