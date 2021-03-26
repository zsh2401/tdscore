import RawMartix from "./RawMartix";

export type ValueProvider<E> = E | ((row: number, col: number) => E)
export default function <E>(martix: RawMartix<E>, value: ValueProvider<E>) {
    if (martix.length <= 1) {
        return
    }
    let maxLen = 0;
    martix.forEach((row) => {
        if (row.length > maxLen) {
            maxLen = row.length
        }
    })
    for (let i = 0; i < martix.length; i++) {
        const row = martix[i];
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
    // const walked: E[][] = []
    // let max = martix[0].length
    // for (let i = 1; i < martix.length; i++) {
    //     const row = martix[i]
    //     if (row.length > max) {
    //         max = row.length
    //         walked.forEach(_r => {
    //             while (_r.length < max) {
    //                 _r.push(defaultValue)
    //             }
    //         })
    //     }
    //     while (row.length < max) {
    //         row.push(defaultValue)
    //     }
    //     walked.push(row)
    // }
}