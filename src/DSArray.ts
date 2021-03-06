import getIterator from "./data-structure/iterating/getIterator";
import IIterable from "./data-structure/IIterable";
import IIterator from "./data-structure/IIterator";
import DSArrayWithoutProxy from "./DSArrayWithoutProxy"
import DSObject from "./DSObject"
import IArrayLike from "./IArrayLike";
/**
 * 默认数据提供器
 * --
 * Default value provider.
 * Only be called once when the target index was not initialized.
 */
type DefaultValue = ((i: number) => any) | any;

/**
 * 限制性，不可增长的数组，类似于C系语言中的所有的一般。
 * 用于模拟数据结构中对数组的严格操作。
 * <br/>
 * Stricted, length-fixed array, like C, C++, C# and Java etc.
 */
declare class DSArray<E> extends DSObject implements IIterable<E>, IArrayLike<E>{
    constructor(length: number, defaultValue?: DefaultValue);

    /**
     * Get a new ordered iterator for this array.
     */
    getIterator(): IIterator<E>;

    /**
     * Indexer
     */
    [index: number]: E;

    /**
     * Get the length/capcity of this array.
     * O(1)
     */
    readonly length: number;

    /**
     * O(1)
     * @deprecated use indexer. e.g array[0]
     * @param index 
     */
    get(index: number): E | undefined;

    /**
     * O(1)
     * @deprecated use indexer. e.g array[0]
     * @param index 
     * @param value 
     */
    set(index: number, value: E | undefined): void;

    /**
     * Check if this array contains specified element.
     * O(n)
     * @param v 
     */
    contains(v: E): boolean;

    /**
     * Create a new Native JavaScript Array as the copy of this array.
     * O(n)
     */
    toJSArray(): E[];

    /**
     * Copy the content of a array to another specified array.
     * O(n)
     * @param src the source
     * @param dest the dest
     * @param start 
     * @param count 
     */
    static copy<E>(src: DSArray<E>, dest: DSArray<E>, start?: number, count?: number): void;
}
export default DSArray;

function DSArray<E>(length: number, defaultValue?: DefaultValue): DSArray<E> {
    return create<E>(length, defaultValue);
}

export function create<E>(length: number, defaultValue?: DefaultValue): DSArray<E> {
    const array = <DSArray<E>>(new DSArrayWithoutProxy<E>(length));
    const handler: ProxyHandler<DSArray<E>> = {
        get: (target, p) => {
            const [isNumber, isValidIndex, index] = toIndex(target.length, p);
            if (isValidIndex) {
                let v = target[index];
                if (typeof v === "undefined" && defaultValue !== undefined) {
                    v = (typeof defaultValue === "function" ? defaultValue(index) : defaultValue);
                    target[index] = v;
                }
                return v;
            } else if (isNumber) {
                throw new RangeError(`Index out of range ${String(p)}`);
            } else {
                //@ts-ignore
                return target[p];
            }
        }
    }

    const proxy = new Proxy(array, handler);
    return proxy;
}
/**
 * 
 * 从ES数组中创建DS数组
 * 该操作基于对原有数组的映射
 * 
 * --
 * 
 * Create a new DSArray from a ES Array.
 * Note: This operation is based upon the mapping to original ES array.
 * 
 * @param jsArray 
 */
export function from<E>(jsArray: E[]): DSArray<E> {
    return new DSArray<E>(jsArray.length, (i: number) => jsArray[i]);
}
export function copyToDSArray<E>(jsArray: E[]): DSArray<E> {
    const iterator = getIterator<E>(jsArray);
    const len = jsArray.length;
    const dsArray = new DSArray<E>(len);
    for (let i = 0; iterator.hasNext(); i++) {
        dsArray[i] = iterator.next();
    }
    return dsArray;
}

function toIndex<E>(len: number, p: any): [isNumber: boolean, isValid: boolean, validIndex: number] {
    // console.log(`toIndex: ${typeof p}:${p} len:${len}`);
    var n = Number(p);
    return [!isNaN(n), n >= 0 && n < len, n];
}