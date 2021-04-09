import uuid from "../../math/uuid";
import { getHashCodeString } from "./hashCodeForPrimitiveType";

export const WEEK_HASHCODE_GETTER_NAME = "___ds_getHashCode";

const SEED: string = "I know, I know I’ve let you down. I've been fool to myself.";

export default function (obj: any): number {

    if (obj[WEEK_HASHCODE_GETTER_NAME]) {
        return obj[WEEK_HASHCODE_GETTER_NAME]();
    }

    let str = SEED;
    try {
        str += JSON.stringify(obj);
    } catch (err) {
        str += uuid();
    }
    const hash = getHashCodeString(str);

    Object.defineProperty(obj, WEEK_HASHCODE_GETTER_NAME, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: (): number => hash
    });

    return hash;
}