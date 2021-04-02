import hashcode from "../util/hash/hash";

String.prototype.toDSNumber = function () {
    //@ts-expect-error
    return DSNumber.valueOf(this);
}
String.prototype.getHashCode = function () {
    return hashcode(this);
}