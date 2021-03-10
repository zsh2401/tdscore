import dsEquals from "../dsEquals"
import dsHashCode from "../dsHashCode";

Object.dsHashCodeOf = (o: any) => {
    return dsHashCode(o);
}
Object.dsEquals = (a: any, b: any) => {
    return dsEquals(a, b);
}
Object.prototype.dsHashCode = function () {
    return dsHashCode(this);
}
Object.prototype.dsEquals = function (other: any) {
    return dsEquals(this, other);
}