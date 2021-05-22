import { dsHashCode } from "..";
import { hash } from "../util/hashing";
import { getHashCodeBoolean, getHashCodeNumber, getHashCodeString } from "../util/hashing/hashCodeForPrimitiveType";

/**
 * Load all sideeffect
 */
export default function load() {
    registerArrayExt()
    registerBooleanExt()
    registerNumberExt()
    registerStringExt()
}
export function registerArrayExt() {
    //@ts-ignore
    Array.prototype.getIterator = function () {
        //@ts-ignore
        return fromESIterator(this).getIterator()
    }
    //@ts-ignore
    Array.prototype.toDSArray = function () {
        //@ts-ignore
        return toDSArray(this);
    }
    //@ts-ignore
    Array.prototype.remove = function <T>(item: T) {
        const arr: Array<T> = this;
        const index = arr.indexOf(item);
        if (index !== -1) {
            for (let i = index; i < arr.length - 1; i++) {
                arr[i] = arr[i + 1]
            }
            arr.pop();
        }
    }
    Array.prototype.indexOf = function <T>(item: T): number {
        const arr: Array<T> = this;
        return arr
            .findIndex(current => dsHashCode(current) === dsHashCode(item));
    }
    //@ts-ignore
    Array.prototype.getHashCode = function () {
        //@ts-ignore
        return getHashCodeBoolean(this);
    }
}
export function registerBooleanExt() {
    //@ts-ignore
    Boolean.prototype.getHashCode = function () {
        //@ts-ignore
        return hashcode(this);
    }
    //@ts-ignore
    Boolean.prototype.toDSNumber = function () {
        //@ts-ignore
        return this ? DSNumber.ONE : DSNumber.ZERO;
    }
}
export function registerNumberExt() {
    //@ts-ignore
    Number.prototype.toDSNumber = function () {
        //@ts-ignore
        return DSNumber.valueOf(this);
    }
    //@ts-ignore
    Number.prototype.getHashCode = function () {
        //@ts-ignore
        return getHashCodeNumber(this);
    }

    //@ts-ignore
    Number.prototype.toJSNumber = function () {
        return this;
    }
}
export function registerStringExt() {
    //@ts-ignore
    String.prototype.toDSNumber = function () {
        //@ts-expect-error
        return DSNumber.valueOf(this);
    }
    //@ts-ignore
    String.prototype.getHashCode = function () {
        //@ts-ignore
        return getHashCodeString(this);
    }
}