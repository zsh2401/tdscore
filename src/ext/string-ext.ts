import hashcode from "../util/hash/hashcode";

String.prototype.toDSNumber = function () {
    //@ts-expect-error
    return DSNumber.valueOf(this);
}
String.prototype.getHashCode = function () {
    return hashcode(this);
}