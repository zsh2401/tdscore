import toDSArray from "../data-structure/iterating/toDSArray";
import getIterator from "../data-structure/iterating/getIterator"
import { getHashCodeAny } from "../util/hash/hashcode.impl";
Array.prototype.getIterator = function () {
    return getIterator(this);
}
Array.prototype.toDSArray = function () {
    return toDSArray(this);
}
Array.prototype.getHashCode = function () {
    return getHashCodeAny(this);
}