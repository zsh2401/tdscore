import DSNumber from "../DSNumber";
import hashcode from "../util/hash/hash";

Boolean.prototype.getHashCode = function () {
    return hashcode(this);
}
Boolean.prototype.toDSNumber = function () {
    return this ? DSNumber.ONE : DSNumber.ZERO;
}