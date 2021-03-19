import DSObject from "./DSObject";
import { hashCode } from "./util/hash";

export default function dsEquals(left: any, right: any) {

    if (left instanceof DSObject) {
        return left.equals(right);
    } else if (right instanceof DSObject) {
        return right.equals(left);
    }

    if (typeof left !== typeof right) {
        return false;
    }

    if (left === right) {
        return true;
    } else {
        const lHash = hashCode(left);
        const rHash = hashCode(right);
        return lHash === rHash;
    }

    // const [n, u] = nuCount(left, right);

    // if (n === 1 || u === 1) {
    //     return false;
    // }


}
// /**
//  * count the number of undefined or null element.
//  * @param left 
//  * @param right 
//  */
// function nuCount(left: any, right: any): [number, number] {

//     let cUndef = 0;
//     let cNull = 0;

//     if (left === null) {
//         cNull++
//     } else if (left === undefined) {
//         cUndef++;
//     }

//     if (right === null) {
//         cNull++
//     } else if (right === undefined) {
//         cUndef++;
//     }
//     return [cNull, cUndef]
// }