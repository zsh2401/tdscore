import toDSArray from "../data-structure/iterating/toDSArray";
import getIterator from "../data-structure/iterating/getIterator"
Array.prototype.getIterator = function () {
    return getIterator(this);
}
Array.prototype.toDSArray = function () {
    return toDSArray(this);
}