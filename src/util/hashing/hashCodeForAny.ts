import uuid from "../../math/uuid";
import { getHashCodeString } from "./hashCodeForPrimitiveType";

export const CACHED_HASHCODE_GETTER = Symbol("Hidden hash code cache method");

const SEED: string = "I know, I know I’ve let you down. I've been fool to myself.";

export default function (obj: any): number {

    if (typeof obj[CACHED_HASHCODE_GETTER] === "function") {
        return obj[CACHED_HASHCODE_GETTER]();
    }

    let str = SEED;
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