/**
 * 拉马努金公式大全
 * @author zsh2401
 * Jan 31, 2021
 */

import factorial from "./fn/factorial";
import pow from "./fn/pow";

/**
 * Get PI
 */
export function getPI(): number {
    const MAX_N = 15;
    const f = (n: number) => {
        const u = (factorial(4 * n).toJSNumber()) * (1103 + 26390 * n)
        const d = pow(factorial(n), 4).toJSNumber() * pow(396, 4 * n).toJSNumber()
        return u / d;
    }

    const left = pow(8, 0.5).toJSNumber() / 9801;
    let right = 0;
    for (let n = 0; n < MAX_N; n++) {
        right += f(n);
    }

    return 1 / (left * right);
}
