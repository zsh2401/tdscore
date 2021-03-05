import getIterator from "../data-structure/iterating/getIterator"

Array.prototype.getIterator = function () {
    return getIterator(this);
}