import uuid from "../../math/uuid";
import { getHashCodeString } from "./hashCodeForPrimitiveType";

export const CACHED_HASHCODE_GETTER = Symbol("Hidden hash code cache method");

const SEED: string = "I know, I know I’ve let you down. I've been fool to myself.";

let cacheMap: WeakMap<object, any>;

export default function (obj: any): number {
    if (WeakMap) {
        return es6(obj);
    } else {
        return es5(obj);
    }
}
function getSeed(): string {
    return SEED;
}
function es6(obj: any): number {

    if (!cacheMap) {
        cacheMap = new WeakMap();
    }

    let cachedHashCode = cacheMap.get(obj);

    if (cachedHashCode === undefined) {
        let str = getSeed();
        try {
            str += JSON.stringify(obj);
        } catch {
            str += + uuid()
        }
        cachedHashCode = getHashCodeString(str);
        cacheMap.set(obj, cachedHashCode)
    }

    return cachedHashCode;

}
function es5(obj: any): number {

    if (typeof obj[CACHED_HASHCODE_GETTER] === "function") {
        return obj[CACHED_HASHCODE_GETTER]();
    }

    let str = getSeed();
    try {
        str += JSON.stringify(obj);
    } catch {
        str += + uuid()
    }

    const hash = getHashCodeString(str);

    Object.defineProperty(obj, CACHED_HASHCODE_GETTER, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: (): number => hash
    });

    return hash;
}