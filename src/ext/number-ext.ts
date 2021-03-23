import DSNumber from "../DSNumber";
import hashcode from "../util/hash/hashCode";

Number.prototype.toDSNumber = function () {
    //@ts-ignore
    return DSNumber.valueOf(this);
}
Number.prototype.getHashCode = function () {
    return hashcode(this);
}

//@ts-ignore
Number.prototype.toJSNumber = function () {
    return this;
}