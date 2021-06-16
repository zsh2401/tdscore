import { ascdeningComparer, descdeningComparer } from "../../../src/algorithm/sort/comparers"
import "ts-jest"
import "../../../src/ext"
import { IArrayLike } from "../../../src";
import IComparer from "../../../src/IComparer";
export interface Option {
    descend?: boolean;
}
export default function (name: string, iternalSortAlgorithm: (a: IArrayLike<number>, comparer: IComparer<number>) => void, option?: Option):
    () => void {
    return () => {
        it(`Ascending Sort for ${name}`, () => {
            const arr = generateRandomArray();
            iternalSortAlgorithm(arr, ascdeningComparer);
            expect(isAscending(arr)).toBeTruthy();
        });

        if ((option === undefined || option.descend === undefined) || (option && option.descend !== undefined && option.descend)) {
            it(`Descending Sort for ${name}`, () => {
                const arr = generateRandomArray();
                iternalSortAlgorithm(arr, descdeningComparer);
                expect(isDescending(arr)).toBeTruthy();
            });
        }

        it(`It's safe for empty array ${name}`, () => {
            const arr: any[] = []
            expect(() => iternalSortAlgorithm(arr, ascdeningComparer)).not.toThrow();
        });

        it("Great scale of data test", () => {
            const arr: any[] = generateRandomArray(10_000)
            expect(() => iternalSortAlgorithm(arr, ascdeningComparer)).not.toThrow();
            expect(isAscending(arr)).toBeTruthy();
        })
    }
}
function generateRandomArray(len: number = -1): number[] {
    len = len === -1 ? Math.floor(3 + Math.random() * 17) : len;
    const a: number[] = [];
    for (let i = 0; i < len; i++) {
        a.push(Math.floor(Math.random() * 100));
    }
    return a;
}
function isAscending(a: ArrayLike<number>) {
    for (let i = 0; i < a.length - 1; i++) {
        if (a[i] > a[i + 1]) {
            return false;
        }
    }
    return true;
}
function isDescending(a: ArrayLike<number>) {
    for (let i = 0; i < a.length - 1; i++) {
        if (a[i] < a[i + 1]) {
            return false;
        }
    }
    return true;
}