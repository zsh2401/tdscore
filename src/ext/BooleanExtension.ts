import hashcode from "../util/hash/hashcode";

Boolean.prototype.getHashCode = function () {
    return hashcode(this);
}