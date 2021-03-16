import "ts-jest"
import { defaultOf } from "../../src"
it("returns correct value", () => {
    expect(defaultOf(typeof "")).toBeNull()
    expect(defaultOf(typeof null)).toBeNull()
    expect(defaultOf(typeof 1)).toBe(0)
    expect(defaultOf(typeof true)).toBe(false)
    const a = defaultOf(typeof Symbol("f"));
    const b = defaultOf(typeof Symbol("f"));
    expect(typeof a).toBe("symbol")
    expect(typeof b).toBe("symbol")
    expect(defaultOf(typeof (() => { }))).toBeNull()
    expect(a).toBe(b)
})