import { dsHashCode } from "..";
import IComparer from "./IComparer";

/**
 * 哈希码比较器
 * @param a 
 * @param b 
 * @returns 
 */
export const hash: IComparer<any> = (a: any, b: any) => {
    return dsHashCode(a) - dsHashCode(b)
}

/**
 * 数字比较器
 * @param a 
 * @param b 
 * @returns 
 */
export const number: IComparer<number> = (a: number, b: number) => {
    return a - b
}

/**
 * 默认导出
 */
export default {
    number,
    hash
}