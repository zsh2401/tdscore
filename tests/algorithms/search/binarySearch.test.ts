import "ts-jest"
import { binarySearch, sequenceSearch } from "../../../src"
const a: number[] = [];
for (let i = 0; i < 1000000; i++) {
    a[i] = i
}
it("can use", () => {
    expect(binarySearch(a, 50)).toBe(50)
    expect(binarySearch(a, 10001)).toBe(-1)
})
it("use seq to find as comprasion",()=>{
    expect(sequenceSearch(a, 50)).toBe(50)
    expect(sequenceSearch(a, -1)).toBe(-1)
})