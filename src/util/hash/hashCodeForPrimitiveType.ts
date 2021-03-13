const STR_HASH_SEED = 0;
const VALUE_FOR_TRUE = 1231;
const VALUE_FOR_FALSE = 1237;
const VALUE_FOR_NULL = 0;
const VALUE_FOR_UNDEFINED = -1;
export function getHashCodeBoolean(v: boolean) {
    return v === true ? VALUE_FOR_TRUE : VALUE_FOR_FALSE;
}
export function getHashCodeString(str: string) {
    let hash = STR_HASH_SEED, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
export function getHashCodeNullOrUndefined(v: null | undefined) {
    return typeof v === "undefined" ? VALUE_FOR_UNDEFINED : VALUE_FOR_NULL;
}
export function getHashCodeNumber(v: number) {
    if (Number.isInteger(v)) {
        return v;
    } else {
        v = Number.parseInt(v.toString(2).replace(".", ""), 2);
        return v;
    }
}