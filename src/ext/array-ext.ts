import toDSArray from "../data-structure/iterating/toDSArrayForItertable";
import getIterator from "../data-structure/iterating/getIterator"
import getHashCodeAny from "../util/hashing/hashCodeForAny";
import dsHashCode from "../hash";
Array.prototype.getIterator = function () {
    return getIterator(this);
}
Array.prototype.toDSArray = function () {
    return toDSArray(this);
}
Array.prototype.remove = function <T>(item: T) {
    const arr: Array<T> = this;
    const index = arr.indexOf(item);
    if (index !== -1) {
        for (let i = index; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1]
        }
        arr.pop();
    }
}
Array.prototype.indexOf = function <T>(item: T): number {
    const arr: Array<T> = this;
    return arr
        .findIndex(current => dsHashCode(current) === dsHashCode(item));
}
Array.prototype.getHashCode = function () {
    return getHashCodeAny(this);
}