import { ascdeningComparer, descdeningComparer } from "../../../src/algorithm/sort/comparers"
import "ts-jest"
import "../../../src/ext"
import { IArrayLike } from "../../../src";
import IComparer from "../../../src/IComparer";
export interface Option {
    descend?: boolean;
}
export default function (name: string, internalSortAlgorithm: (a: IArrayLike<number>, comparer: IComparer<number>) => void, option?: Option):
    () => void {
    return () => {

        it("Easy Test", () => {
            const a = [9873, 5.5, 6032, 1, 9, -10]
            internalSortAlgorithm(a, ascdeningComparer);
            expect(a).toStrictEqual([-10, 1, 5.5, 9, 6032, 9873]);
            internalSortAlgorithm(a, descdeningComparer);
            expect(a).toStrictEqual([9873, 6032, 9, 5.5, 1, -10]);
        })

        it(`Ascending Sort for ${name}`, () => {
            const arr = generateRandomArray();
            internalSortAlgorithm(arr, ascdeningComparer);
            expect(isAscending(arr)).toBeTruthy();
        });

        if ((option === undefined || option.descend === undefined) || (option && option.descend !== undefined && option.descend)) {
            it(`Descending Sort for ${name}`, () => {
                const arr = generateRandomArray();
                internalSortAlgorithm(arr, descdeningComparer);
                expect(isDescending(arr)).toBeTruthy();
            });
        }

        it(`It's safe for empty array ${name}`, () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const arr: any[] = []
            expect(() => internalSortAlgorithm(arr, ascdeningComparer)).not.toThrow();
        });

    }
}
function generateRandomArray(len = -1): number[] {
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