import "ts-jest"
import { sequenceSearch } from "../../../src"
it("can find", () => {
    const a = [12, 1, 2, 12, 21, 5, 686534, 529, 121, 12312, -1, -12, 321, -12, -312, 213];
    const index = sequenceSearch(a, 686534)
    expect(index).toBe(6)
    expect(a[index]).toBe(686534)
})

it("can not find", () => {
    const a = [12, 1, 2, 12, 21, 5, 686534, 529, 121, 12312, -1, -12, 321, -12, -312, 213];
    const index = sequenceSearch(a, 686)
    expect(index).toBe(-1)
    expect(a[index]).toBeUndefined()
})