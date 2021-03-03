import Fun from "./Fun";

export default function (approach: number, f: Fun): number {
    const b = below(approach, f);
    const a = above(approach, f);
    return b == a ? b : Number.NaN;
}
function below(approach: number, f: Fun): number {
    for (let d = approach - 10; d <= approach; d = approach
        - ((approach - d) / 10)) {
        if (f(d) == Number.POSITIVE_INFINITY) {
            return Number.POSITIVE_INFINITY;
        } else if (f(d) == Number.NEGATIVE_INFINITY) {
            return Number.NEGATIVE_INFINITY;
        } else if (Number.isNaN(f(d))) {
            return f(approach + ((approach - d) * 10));
        } else {
            if (d == approach) {
                return f(d);
            } else if (approach - d < 0.00000000001) {
                d = approach;
            }

        }
    }
    return Number.NaN;
}
function above(approach: number, f: Fun): number {
    for (let d = approach + 10; d >= approach; d = approach
        - ((approach - d) / 10)) {
        if (f(d) == Number.POSITIVE_INFINITY) {
            return Number.POSITIVE_INFINITY;
        } else if (f(d) == Number.NEGATIVE_INFINITY) {
            return Number.NEGATIVE_INFINITY;
        } else if (Number.isNaN(f(d))) {
            return f(approach + ((approach - d) * 10));
        } else {
            if (d == approach) {
                return f(d);
            } else if (d - approach < 0.00000000001) {
                d = approach;
            }

        }
    }
    return Number.NaN;
}