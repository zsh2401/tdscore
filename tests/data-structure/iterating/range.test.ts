import "ts-jest"
import { range, size } from "../../../src"
import toJSArray from "../../../src/data-structure/iterating/toJSArrayForItertable"
it("zero to zero", () => {
    expect(toJSArray(range(0, 0))).toStrictEqual([0])
})

it("includes from and to", () => {
    expect(toJSArray(range(0, 1))).toStrictEqual([0, 1])
})

it("0 - 100", () => {
    expect(size(range(0, 100))).toBe(101)
})

it("0 - -100",()=>{
    expect(range(0,-1).getIterator().hasNext()).toBeFalsy()
})