import DSNumber from "../DSNumber";
import hashcode from "../util/hash/hashCode";

Number.prototype.toDSNumber = function () {
    //@ts-expect-error
    return DSNumber.valueOf(this);
}
Number.prototype.getHashCode = function () {
    return hashcode(this);
}