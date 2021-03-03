import uuid from "../../math/uuid";
import { getHashCodeString } from "./hashcode.impl";

export const WEEK_HASHCODE_GETTER_NAME = "___ds_getHashCode";

const SEED: string = "I know, I know I’ve let you down.I've been fool to myself.";

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

    obj[WEEK_HASHCODE_GETTER_NAME] = (): number => hash;

    return hash;
}