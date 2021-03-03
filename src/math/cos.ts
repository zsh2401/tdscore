import factorial from "./factorial"
const TIMES = 15;
export default function (x: number): number {
    let result = 0;
    for (let i = 0; i < TIMES; i++) {
        result += term(x, i);
    }
    return result;
}
function term(x: number, n: number): number {
    const sign = (-1) ** n;
    const s = (2 * n);

    const numerator = x ** (s);
    const denominator = factorial(s);

    return sign * (numerator / denominator);
}