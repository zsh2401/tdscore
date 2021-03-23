import "ts-jest"
import BitSpan from "../../../src/data-structure/linear/BitSpan"
it("left shift", () => {
    const s = new BitSpan([true, false, true, true, true])
    expect(s.leftShift(2).toJSArray()).toStrictEqual([true, true, true, false, false]);
    expect(s.leftShift(10).toJSArray()).toStrictEqual([false, false, false, false, false]);
    expect(s.leftShift(0).toJSArray()).toStrictEqual([true, false, true, true, true]);
})

it("set all", () => {
    const a = new BitSpan([true, false, true, true, true]);
    expect(a.setAll(true).toJSArray()).toStrictEqual([true, true, true, true, true])
    expect(a.setAll(false).toJSArray()).toStrictEqual([false, false, false, false, false])
})
it("right shift", () => {
    const s = new BitSpan([true, false, true, true, true])
    expect(s.rightShift(2).toJSArray()).toStrictEqual([false, false, true, false, true]);
    expect(s.rightShift(10).toJSArray()).toStrictEqual([false, false, false, false, false]);
    expect(s.rightShift(0).toJSArray()).toStrictEqual([true, false, true, true, true]);
})

it("xor", () => {
    const a = new BitSpan([false, false, true, true])
    const b = new BitSpan([false, true, false, true])
    const c = a.xor(b)
    expect(c.toJSArray()).toStrictEqual([false, true, true, false]);

    expect(() => b.xor(new BitSpan([]))).toThrow()
})

it("at", () => {
    const a = new BitSpan([false, false, true, true])
    expect(a.at(1)).toBe(false)
    expect(a.at(2, true)).toBe(true)
    expect(a.at(2)).toBe(true)
})

it("length", () => {
    const a = new BitSpan([false, false, true, true])
    expect(a.length).toBe(4)
})
it("nor", () => {
    const a = new BitSpan([false, false, true, true])
    const b = new BitSpan([false, true, false, true])
    const c = a.nor(b)
    expect(c.toJSArray()).toStrictEqual([true, false, false, false]);

    expect(() => a.nor(new BitSpan([]))).toThrow()
})

it("and", () => {
    const a = new BitSpan([false, false, true, true])
    const b = new BitSpan([false, true, false, true])
    const c = a.and(b)
    expect(c.toJSArray()).toStrictEqual([false, false, false, true])

    expect(() => a.and(new BitSpan([]))).toThrow()
})

it("not", () => {
    const a = new BitSpan([false, false, true, true])
    expect(a.not().toJSArray()).toStrictEqual([true, true, false, false]);
})