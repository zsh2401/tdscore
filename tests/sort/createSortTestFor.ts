import IInternalSortAlgorithm, { IComparer } from "../../src/algorithm/sort/IInternalSortAlgorithm"
import { ascdeningComparer, descdeningComparer } from "../../src/algorithm/sort/comparers"
import "ts-jest"
export default function (name: string, iternalSortAlgorithm: IInternalSortAlgorithm<number>):
    () => void {
    return () => {
        it(`Ascending Sort for ${name}`, () => {
            const arr = generateRandomArray();
            iternalSortAlgorithm(arr, ascdeningComparer);
            expect(isAscending(arr)).toBeTruthy();
        });

        it(`Descending Sort for ${name}`, () => {
            const arr = generateRandomArray();
            iternalSortAlgorithm(arr, descdeningComparer);
            expect(isDescending(arr)).toBeTruthy();
        });

        it(`It's safe for empty array ${name}`, () => {
            const arr: any[] = []
            expect(() => iternalSortAlgorithm(arr, ascdeningComparer)).not.toThrow();
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