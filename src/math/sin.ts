import { PI } from ".";
import abs from "./abs";
import factorial from "./factorial"

export default function (x: number): number {
    let result = 0;

    for (let i = 0; i < abs(x * 10 / PI); i++) {
        result += term(x, i);
    }
    return result;
}

function term(x: number, n: number): number {
    const sign = (-1) ** n;
    const s = (2 * n + 1);

    const numerator = x ** (s);
    const denominator = factorial(s);

    return sign * (numerator / denominator);
}