import IInternalSortAlgorithm, { IComparer } from "../../src/algorithm/sort/IInternalSortAlgorithm"
import "ts-jest"
export default function (name: string, iternalSortAlgorithm: IInternalSortAlgorithm<number>):
    () => void {
    const asending: IComparer<number> = (a: number, b: number) => a > b;
    const descending: IComparer<number> = (a: number, b: number) => a < b;
    return () => {
        it(`Ascending Sort for ${name}`, () => {
            const arr = generateRandomArray();
            iternalSortAlgorithm(arr, asending);
            expect(isAscending(arr)).toBeTruthy();
        });

        it(`Descending Sort for ${name}`, () => {
            const arr = generateRandomArray();
            iternalSortAlgorithm(arr, descending);
            expect(isDescending(arr)).toBeTruthy();
        });
    }
}
function generateRandomArray(): number[] {
    const len = Math.floor(Math.random() * 20);
    const a: number[] = [];
    for (let i = 0; i < len; i++) {
        a.push(Math.floor(Math.random() * 20));
    }
    return a;
}
function isAscending(a: number[]) {
    for (let i = 0; i < a.length - 1; i++) {
        if (a[i] > a[i + 1]) {
            return false;
        }
    }
    return true;
}
function isDescending(a: number[]) {
    for (let i = 0; i < a.length - 1; i++) {
        if (a[i] < a[i + 1]) {
            return false;
        }
    }
    return true;
}