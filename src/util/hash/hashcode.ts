import { isString, isNumber, isHashCodeGettable, isBoolean } from "./typechecker"
import {
    getHashCodeAny, getHashCodeBoolean, getHashCode4HashCodeGettable,
    getHashCodeNumber, getHashCodeString, getHashCodeNullOrUndefined
} from "./hashcode.impl"
export default function (v: any): number {
    if (v == null || v == undefined) {
        return getHashCodeNullOrUndefined(v);
    }
    else if (isString(v)) {
        return getHashCodeString(v);
    } else if (isNumber(v)) {
        return getHashCodeNumber(v);
    } else if (isBoolean(v)) {
        return getHashCodeBoolean(v);
    } else if (isHashCodeGettable(v)) {
        return getHashCode4HashCodeGettable(v);
    }
    else {
        return getHashCodeAny(v);
    }
}