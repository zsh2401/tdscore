import hashcode from "../util/hashing/hash";

String.prototype.toDSNumber = function () {
    //@ts-expect-error
    return DSNumber.valueOf(this);
}
String.prototype.getHashCode = function () {
    return hashcode(this);
}