/**
 * 拉马努金公式大全
 * @author zsh2401
 * Jan 31, 2021
 */

import factorial from "./fn/factorial";
import pow from "./fn/pow";
import sigma from "./sigma";

/**
 * Get PI
 */
export function getPI(): number {

    const MAX_N = 15;

    const f = (n: number) => {
        const u = factorial<number>(4 * n) * (1103 + 26390 * n)
        const d = pow<number>(factorial(n), 4) * pow<number>(396, 4 * n)
        return u / d;
    }

    const left = pow<number>(8, 0.5) / 9801;
    const right = sigma(f, 0, MAX_N)

    return 1 / (left * right);
}
