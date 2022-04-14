import RawMatrix from "./MatrixTypes";

export type ValueProvider<E> = E | ((row: number, col: number) => E)
export default function <E>(matrix: RawMatrix<E>, value: ValueProvider<E>) {
    if (matrix.length <= 1) {
        return
    }
    let maxLen = 0;
    matrix.forEach((row) => {
        if (row.length > maxLen) {
            maxLen = row.length
        }
    })
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        for (let j = row.length; j < maxLen; j++) {
            if (typeof value === "function") {
                //@ts-ignore
                const v = value(i, j)
                row.push(v)
            } else {
                row.push(value)
            }
        }
    }
}