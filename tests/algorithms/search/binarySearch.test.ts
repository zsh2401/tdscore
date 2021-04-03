import "ts-jest"
import { binarySearch, sequenceSearch } from "../../../src/algorithm"
const a: number[] = [];
for (let i = 0; i < 1000000; i++) {
    a[i] = i
}
it("can use", () => {
    expect(binarySearch(a, (e) => e - 50)).toBe(50)
    expect(binarySearch(a, (e) => e - 10001)).toBe(-1)
})
it("use seq to find as comprasion", () => {
    expect(sequenceSearch(a, (e) => e - 50)).toBe(50)
    expect(sequenceSearch(a, (e) => e -(- 1))).toBe(-1)
})