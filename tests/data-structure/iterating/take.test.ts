import "ts-jest"
import { toJSArrayForItertable } from "../../../src"
import take from "../../../src/ixa/take"
it("take no element", () => {
    const a = toJSArrayForItertable(take([1, 2, 3, 4, 5], 0))
    expect(a).toStrictEqual([])
})
it("take elements more than collection have", () => {
    const a = toJSArrayForItertable(take([1, 2, 3, 4, 5, 6], 10))
    expect(a).toStrictEqual([1,2,3,4,5,6])
})
it("take elements less than collection have", () => {
    const a = toJSArrayForItertable(take([1, 2, 3, 4, 5, 6], 1))
    expect(a).toStrictEqual([1])
})
it("take elements which count of it same as collection", () => {
    const a = toJSArrayForItertable(take([1, 2, 3, 4, 5, 6], 6))
    expect(a).toStrictEqual([1, 2, 3, 4, 5, 6])
})