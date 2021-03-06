import hashcode from "../util/hash/hashcode";

Number.prototype.toDSNumber = function () {
    //@ts-expect-error
    return DSNumber.valueOf(this);
}
Number.prototype.getHashCode = function(){
    return hashcode(this);
}