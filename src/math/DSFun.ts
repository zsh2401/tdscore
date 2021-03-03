import { DSNumber } from "..";

export default interface DSFun {
    (x: DSNumber): DSNumber;
    level?: number;
}
export function derivationOf(f: DSFun): DSFun {
    f.level ??= 0;
    const minization = DSNumber.valueOf(10 ** f.level);
    const dx = DSNumber.valueOf(1e-5).dividedBy(minization);
    const result: DSFun = (x: DSNumber) => {
        const dy = f(x.plus(dx)).sub(f(x));
        return dy.dividedBy(dx);
    }
    result.level = f.level + 1;
    return result;
}