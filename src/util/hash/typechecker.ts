import { IHashCodeGettable } from ".";


export function isBoolean(e: any): e is boolean {
    return typeof e === "boolean";
}
export function isHashCodeGettable(e: any): e is IHashCodeGettable {
    return (<IHashCodeGettable>e).getHashCode !== undefined;
}
export function isString(x: any): x is string {
    return typeof x === "string";
}
export function isNumber(x: any): x is number {
    return typeof x === "number";
}